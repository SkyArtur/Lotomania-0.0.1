from typing import Optional

__all__ = ['parse_number']


def parse_number(value: str, *, money: bool = False, decimal: bool = False, integer: bool = False) -> Optional[float | int]:
    try:

        if money:
            num = value.replace('R$', '').replace('.', '').replace(',', '.')
        elif decimal:
            num = value.replace('.', '').replace(',', '.')
        else:
            num = value.replace(',', '')

        return float(num) if not integer else int(num)

    except (ValueError, TypeError):
        return None
