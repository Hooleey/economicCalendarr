from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import Session
from .models import Event


def seed_if_empty(db: Session):
    existing = db.execute(select(Event.id)).first()
    if existing:
        return

    demo_events = [
        Event(
            title="FOMC Interest Rate Decision",
            date=date(2026, 4, 22),
            country="USA",
            regulator="Federal Reserve",
            importance="high",
        ),
        Event(
            title="ECB Monetary Policy Meeting",
            date=date(2026, 4, 24),
            country="Eurozone",
            regulator="European Central Bank",
            importance="high",
        ),
        Event(
            title="BoE Inflation Report Hearing",
            date=date(2026, 4, 29),
            country="UK",
            regulator="Bank of England",
            importance="medium",
        ),
        Event(
            title="BoJ Outlook Report",
            date=date(2026, 5, 2),
            country="Japan",
            regulator="Bank of Japan",
            importance="medium",
        ),
        Event(
            title="RBA Governor Speech",
            date=date(2026, 5, 5),
            country="Australia",
            regulator="Reserve Bank of Australia",
            importance="low",
        ),
    ]

    db.add_all(demo_events)
    db.commit()