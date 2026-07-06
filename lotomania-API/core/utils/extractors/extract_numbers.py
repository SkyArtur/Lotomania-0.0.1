from ..parsers import parse_number

__all__ = ['extract_numbers']


def extract_numbers(data: dict, target: str) -> list:

    numbers = [parse_number(value, integer=True) for key, value in data.items() if target in key]

    return numbers
