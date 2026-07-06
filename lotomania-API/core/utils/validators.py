from functools import wraps
from typing import Callable
from django.core.exceptions import ValidationError

from .parsers import parse_points

__all__ = ['validate_range_points', 'validate_username']


def validators_decorator(func: Callable) -> Callable:
    @wraps(func)
    def wrapper(*args, **kwargs) -> Callable:
        try:
            return func(*args, **kwargs)
        except (AttributeError, TypeError, ValueError) as e:
            raise ValidationError(e.message)
    return wrapper


@validators_decorator
def validate_range_points(value: str | int) -> bool:
    references = {0, 15, 16, 17, 18, 19, 20}
    point = parse_points(value, references)
    if point is None:
        raise ValueError(f'Invalid value: {value}. Must be a number between 0 and 20.')
    return True


@validators_decorator
def validate_username(value: str) -> bool:
    if not value.isalnum():
        raise ValueError(f'Invalid value: {value}. Must be a valid username.')
    if len(value) < 4 or len(value) > 15:
        raise ValueError(f'Invalid value: {value}. Must be between 4 and 15 characters.')
    return True