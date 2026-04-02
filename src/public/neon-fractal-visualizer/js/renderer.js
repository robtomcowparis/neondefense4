// WebGL 2.0 renderer — shader compilation, FBO management, multi-pass pipeline, audio textures

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl2', {
            antialias: false,
            alpha: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
        });

        if (!this.gl) {
            throw new Error('WebGL 2.0 not supported');
        }

        const gl = this.gl;

        this.floatBufferExt = gl.getExtension('EXT_color_buffer_float');
        gl.getExtension('OES_texture_float_linear');

        this.quadVAO = this._createFullscreenQuad();
        this.programs = {};
        this.fbos = {};

        this.resize();
    }

    _createFullscreenQuad() {
        const gl = this.gl;
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
        return vao;
    }

    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Shader compile error: ${log}`);
        }
        return shader;
    }

    createProgram(name, vertSource, fragSource) {
        if (this.programs[name]) return this.programs[name];

        const gl = this.gl;
        const vert = this.compileShader(gl.VERTEX_SHADER, vertSource);
        const frag = this.compileShader(gl.FRAGMENT_SHADER, fragSource);

        const program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.bindAttribLocation(program, 0, 'a_position');
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(`Program link error: ${log}`);
        }

        gl.deleteShader(vert);
        gl.deleteShader(frag);

        // Cache uniform locations
        const uniformCache = {};
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; i++) {
            const info = gl.getActiveUniform(program, i);
            // Handle array uniforms: store both "name[0]" and "name" for easy access
            uniformCache[info.name] = gl.getUniformLocation(program, info.name);
            // For arrays like u_pulsePositions[0], also store base name
            const bracketIdx = info.name.indexOf('[');
            if (bracketIdx !== -1) {
                const baseName = info.name.substring(0, bracketIdx);
                uniformCache[baseName] = gl.getUniformLocation(program, info.name);
            }
        }

        const entry = { program, uniforms: uniformCache };
        this.programs[name] = entry;
        return entry;
    }

    setUniforms(programEntry, uniforms) {
        const gl = this.gl;

        if (!programEntry.uniformTypes) {
            programEntry.uniformTypes = {};
            const numUniforms = gl.getProgramParameter(programEntry.program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < numUniforms; i++) {
                const info = gl.getActiveUniform(programEntry.program, i);
                programEntry.uniformTypes[info.name] = info.type;
                const bracketIdx = info.name.indexOf('[');
                if (bracketIdx !== -1) {
                    programEntry.uniformTypes[info.name.substring(0, bracketIdx)] = info.type;
                }
            }
        }

        for (const [name, value] of Object.entries(uniforms)) {
            const loc = programEntry.uniforms[name];
            if (loc === undefined || loc === null) continue;

            const type = programEntry.uniformTypes[name];
            if (typeof value === 'number') {
                if (type === gl.INT || type === gl.SAMPLER_2D || type === gl.BOOL) {
                    gl.uniform1i(loc, value);
                } else {
                    gl.uniform1f(loc, value);
                }
            } else if (Array.isArray(value) || value instanceof Float32Array) {
                if (value.length === 2) gl.uniform2fv(loc, value);
                else if (value.length === 3) gl.uniform3fv(loc, value);
                else if (value.length === 4) gl.uniform4fv(loc, value);
                else if (value.length === 8) gl.uniform1fv(loc, value);
                else if (value.length === 16) gl.uniform1fv(loc, value);
            }
        }
    }

    // Create a 1D float texture for audio data (FFT or waveform)
    createAudioTexture(width) {
        const gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, 1, 0, gl.RED, gl.FLOAT,
            new Float32Array(width));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return texture;
    }

    // Update audio texture data each frame (no allocation)
    updateAudioTexture(texture, data) {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, data.length, 1, gl.RED, gl.FLOAT, data);
    }

    createFBO(width, height, format) {
        const gl = this.gl;
        const fbo = gl.createFramebuffer();
        const texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, texture);
        const internalFormat = format || gl.RGBA16F;
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, gl.RGBA, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            console.warn(`FBO incomplete: ${status}, falling back to RGBA8`);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return { fbo, texture, width, height };
    }

    deleteFBO(fboObj) {
        if (!fboObj) return;
        const gl = this.gl;
        gl.deleteFramebuffer(fboObj.fbo);
        gl.deleteTexture(fboObj.texture);
    }

    setupRenderPipeline() {
        const w = this.width;
        const h = this.height;

        for (const key in this.fbos) {
            this.deleteFBO(this.fbos[key]);
        }

        this.fbos.fractal = this.createFBO(w, h);
        this.fbos.fractalB = this.createFBO(w, h); // For transition blending
        this.fbos.bloomExtract = this.createFBO(w, h);
        // Blur at half resolution — bloom is inherently soft, so no visible quality loss
        const bw = Math.max(1, Math.floor(w / 2));
        const bh = Math.max(1, Math.floor(h / 2));
        this.fbos.blurPing = this.createFBO(bw, bh);
        this.fbos.blurPong = this.createFBO(bw, bh);
    }

    renderPass(programEntry, outputFBO, textures, uniforms) {
        const gl = this.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, outputFBO ? outputFBO.fbo : null);
        if (outputFBO) {
            gl.viewport(0, 0, outputFBO.width, outputFBO.height);
        } else {
            gl.viewport(0, 0, this.width, this.height);
        }

        gl.useProgram(programEntry.program);

        if (textures) {
            for (const [unit, tex] of Object.entries(textures)) {
                gl.activeTexture(gl.TEXTURE0 + parseInt(unit));
                gl.bindTexture(gl.TEXTURE_2D, tex);
            }
        }

        if (uniforms) {
            this.setUniforms(programEntry, uniforms);
        }

        gl.bindVertexArray(this.quadVAO);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindVertexArray(null);
    }

    resize(width, height) {
        if (width === undefined) {
            width = this.canvas.clientWidth * (window.devicePixelRatio || 1);
            height = this.canvas.clientHeight * (window.devicePixelRatio || 1);
        }
        width = Math.floor(width);
        height = Math.floor(height);

        if (this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.aspectRatio = width / height;

        this.setupRenderPipeline();
    }

    get maxTextureSize() {
        return this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
    }
}
