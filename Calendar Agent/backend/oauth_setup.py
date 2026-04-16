"""Run once to authorize Google Calendar access: `python -m backend.oauth_setup`."""
from . import google_calendar


def main() -> None:
    google_calendar.run_oauth_flow()
    print("Google Calendar authorization complete. token.json written.")


if __name__ == "__main__":
    main()
