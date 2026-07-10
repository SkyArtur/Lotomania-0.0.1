import re
from datetime import date
from typing import Optional

__all__ = ['parse_date']


def parse_date(date_str: str, *, iso_format: bool = False) -> Optional[date]:
    try:

        pattern = r'^(\d{4})[/-]?(\d{2})[/-](\d{2})$' if iso_format else r'^(\d{2})[/-]?(\d{2})[/-](\d{4})$'
        match = re.match(pattern, date_str)

        if not match:
            return None

        return date.fromisoformat(''.join(match.groups() if iso_format else match.groups()[::-1]))

    except (TypeError, AttributeError, ValueError, Exception):
        return None
