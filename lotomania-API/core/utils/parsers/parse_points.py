from typing import Optional

from .parse_number import parse_number

__all__ = ['parse_points']


def parse_points(value: str | int, references: set[int]) -> Optional[int | float]:
    try:
        point = parse_number(value, integer=True) if isinstance(value, str) else value
        if point not in references:
            return None
        return point
    except (ValueError, TypeError):
        return None
