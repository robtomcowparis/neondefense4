# AGENT_TEAMS_GUIDE.md

A reference for Claude Code sessions on how Agent Teams work and how
to use them effectively in this project.

------------------------------------------------------------------------

## What Are Agent Teams?

Agent Teams is an experimental Claude Code feature that lets a single
Claude session (the "Lead") spawn multiple independent Claude sessions
("teammates") that work in parallel on different parts of a codebase.

Each teammate is a full Claude Code instance with its own context
window, tools, and working state. They coordinate through a shared
task list and a messaging system — not by sharing context.

Think of it as a software team: one tech lead delegates work to
specialized developers who each own a subsystem.

------------------------------------------------------------------------

## Enabling Agent Teams

Set the environment variable in `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Or export it in your shell before launching Claude Code:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

------------------------------------------------------------------------

## Core Concepts

### Team

A named group of agents. Created with `TeamCreate`. This produces:

- `~/.claude/teams/{team-name}/config.json` — member list and metadata
- `~/.claude/tasks/{team-name}/` — shared task files

One team per session. Clean up before starting a new one.

### Lead

The main Claude Code session that creates the team. The Lead:

- Spawns teammates with the `Agent` tool
- Creates and assigns tasks
- Integrates work across subsystems
- Sends shutdown requests when done

The Lead should coordinate, not implement. Use delegate mode
(`Shift+Tab`) to restrict the Lead to coordination-only tools.

### Teammates

Independent Claude Code instances spawned by the Lead. Each teammate:

- Has its own context window (does NOT inherit the Lead's history)
- Loads `CLAUDE.md` automatically at startup
- Can read/write files, run commands, and use all standard tools
- Communicates with the Lead and other teammates via `SendMessage`
- Goes idle after each turn (this is normal — send a message to wake)

### Tasks

JSON-based work items stored in `~/.claude/tasks/{team-name}/`.

- Created with `TaskCreate` (subject, description, activeForm)
- Assigned with `TaskUpdate` (set `owner` to teammate name)
- Dependency tracking with `addBlockedBy` / `addBlocks`
- Status flow: `pending` → `in_progress` → `completed`
- File-lock based claiming prevents race conditions

------------------------------------------------------------------------

## How to Create and Run a Team

### Step 1: Create the Team

```
TeamCreate({ team_name: "my-team", description: "Working on feature X" })
```

### Step 2: Spawn Teammates

Use the `Agent` tool with `team_name` and `name` parameters:

```
Agent({
  subagent_type: "general-purpose",
  team_name: "my-team",
  name: "gameplay-agent",
  model: "sonnet",
  prompt: "You are the Gameplay Agent. You own src/gameplay/*.
    Your task is to implement the storm ring system.
    Read CLAUDE.md for full project context.
    Do NOT modify files outside src/gameplay/."
})
```

Key rules for spawn prompts:
- Teammates start with a blank conversation — they do NOT see the
  Lead's prior messages
- Include all relevant context: role, owned files, what to build,
  what NOT to touch
- Tell them to read CLAUDE.md for project-wide rules
- Use Sonnet for teammates (cheaper). Lead uses Opus (better at
  coordination)

### Step 3: Create Tasks

```
TaskCreate({
  subject: "Implement storm ring system",
  description: "Create src/gameplay/stormRing.js with ring state,
    shrink phases, and damage calculation. Export createStormRing(),
    updateStormRing(), isInsideRing(), getStormDamage().",
  activeForm: "Implementing storm ring system"
})
```

### Step 4: Set Dependencies and Assign

```
// Task 8 depends on tasks 1 and 5
TaskUpdate({ taskId: "8", addBlockedBy: ["1", "5"] })

// Assign task 1 to gameplay-agent
TaskUpdate({ taskId: "1", owner: "gameplay-agent" })
```

### Step 5: Monitor and Integrate

- Messages from teammates are delivered automatically
- When a teammate completes a task, they mark it via `TaskUpdate`
  and the Lead gets notified
- The Lead integrates completed work (e.g., wiring into main.js)
- After integration, downstream tasks unblock automatically

### Step 6: Shutdown and Cleanup

```
// Ask each teammate to shut down
SendMessage({ type: "shutdown_request", recipient: "gameplay-agent",
  content: "All tasks complete, shutting down" })

// After all teammates confirm, clean up
TeamDelete()
```

------------------------------------------------------------------------

## Communication

### Direct Message (default — use this most of the time)

```
SendMessage({
  type: "message",
  recipient: "ai-agent",
  content: "The storm ring state is exported from stormRing.js.
    Import isInsideRing() for your FLEE_STORM behavior.",
  summary: "Storm ring API info for AI agent"
})
```

### Broadcast (use sparingly — sends to ALL teammates)

```
SendMessage({
  type: "broadcast",
  content: "Blocking bug found — all work paused until resolved.",
  summary: "Critical blocking issue"
})
```

Broadcasts are expensive (N teammates = N message deliveries). Only
use for critical team-wide announcements.

### Teammate Idle State

Teammates go idle after every turn. This is completely normal.
An idle teammate is just waiting for input — send a message to wake
them. Do not treat idle notifications as errors or completion signals.

------------------------------------------------------------------------

## Discovering Team Members

Any teammate can read the team config to find other members:

```
Read ~/.claude/teams/{team-name}/config.json
```

The config contains a `members` array:

```json
{
  "members": [
    { "name": "gameplay-agent", "agentId": "abc123", "agentType": "general-purpose" },
    { "name": "ai-agent", "agentId": "def456", "agentType": "general-purpose" }
  ]
}
```

Always refer to teammates by `name`, not `agentId`.

------------------------------------------------------------------------

## Task Design Best Practices

### Size tasks appropriately
- 5-6 tasks per teammate is a good target
- Too small = coordination overhead dominates
- Too large = teammates work too long without check-ins

### Use dependency waves
- **Wave 1**: Independent tasks that can run in parallel
- **Wave 2**: Integration tasks that depend on Wave 1
- **Wave 3**: Polish tasks that depend on Wave 2

This maximizes parallelism while maintaining correct build order.

### Write detailed task descriptions
Teammates have no context beyond what you give them. Include:
- What to implement
- Which files to create or modify
- What APIs to export
- What NOT to change
- Acceptance criteria

### Prefer tasks in ID order
When multiple tasks are available, work on lower-ID tasks first.
Earlier tasks often establish context that later tasks depend on.

------------------------------------------------------------------------

## File Ownership — The Most Important Rule

**Two teammates must NEVER edit the same file.**

This is the single most critical rule for agent teams. If two
teammates modify the same file, one will overwrite the other's work.

Enforce this by:
1. Defining strict file ownership per agent (see CLAUDE.md)
2. Having the Lead own all shared files (main.js, systems/*)
3. Using exported interfaces for cross-system communication
4. Telling teammates explicitly which files they must NOT touch

------------------------------------------------------------------------

## Worktree Isolation

Git worktrees give each agent an isolated copy of the repository.
Each worktree has its own files and branch while sharing history.

- Set `isolation: "worktree"` when spawning an agent
- Worktrees are stored in `.claude/worktrees/`
- Automatically cleaned up if the agent makes no changes
- Useful when teammates might touch overlapping files

For this project, strict file ownership boundaries make worktrees
optional — but they add a safety net.

------------------------------------------------------------------------

## Model Strategy

- **Lead**: Use Opus (best at coordination, synthesis, and integration)
- **Teammates**: Use Sonnet (capable at implementation, much cheaper)
- A 6-teammate team uses roughly 6-7x the tokens of a single session
- Use Haiku only for trivial tasks (simple searches, quick checks)

------------------------------------------------------------------------

## Display Modes

### In-process (default, works everywhere including Windows)
All teammates run in your main terminal. Navigate between them:
- `Shift+Down`: cycle through teammates
- `Ctrl+T`: toggle the task list view

### Split panes (requires tmux or iTerm2, NOT supported on Windows Terminal)
Each teammate gets its own pane. Click to interact directly.

Configure in settings.json:
```json
{ "teammateMode": "in-process" }
```

------------------------------------------------------------------------

## Known Limitations

- No session resumption for teammates after `/resume` or `/rewind`
- Task status can sometimes lag — teammates may not mark completion
- One team per session — clean up before starting another
- No nested teams — teammates cannot spawn their own teams
- The Lead is fixed for the team's lifetime
- All teammates inherit the Lead's permissions at spawn time
- Custom `.claude/agents/*.md` definitions cannot yet be used as
  team teammate templates (open feature request)
- Split panes not supported on Windows Terminal, VS Code terminal,
  or Ghostty

------------------------------------------------------------------------

## Quick Reference

| Action | Tool | Example |
|--------|------|---------|
| Create team | `TeamCreate` | `TeamCreate({ team_name: "my-team" })` |
| Spawn teammate | `Agent` | `Agent({ name: "worker", team_name: "my-team", ... })` |
| Create task | `TaskCreate` | `TaskCreate({ subject: "...", description: "..." })` |
| Assign task | `TaskUpdate` | `TaskUpdate({ taskId: "1", owner: "worker" })` |
| Set dependency | `TaskUpdate` | `TaskUpdate({ taskId: "2", addBlockedBy: ["1"] })` |
| Mark complete | `TaskUpdate` | `TaskUpdate({ taskId: "1", status: "completed" })` |
| List tasks | `TaskList` | `TaskList()` |
| Send DM | `SendMessage` | `SendMessage({ type: "message", recipient: "worker", ... })` |
| Broadcast | `SendMessage` | `SendMessage({ type: "broadcast", content: "...", ... })` |
| Shutdown agent | `SendMessage` | `SendMessage({ type: "shutdown_request", recipient: "worker" })` |
| Delete team | `TeamDelete` | `TeamDelete()` |

------------------------------------------------------------------------

## For This Project

This project (Neon Tanks) uses agent teams for a battle royale game
conversion. See:

- `CLAUDE.md` — Architecture, agent roles, file ownership, game spec
- `Prompt.md` — Full execution plan with task graph and spawn prompts
- `AGENTS.md` — Agent role summaries
- `TEAM.md` — Team startup procedure
- `SYSTEM_BOUNDARIES.md` — Hard file ownership rules
