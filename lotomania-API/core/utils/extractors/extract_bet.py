from typing import Optional

from config.settings import BASE_DIR
from ..parsers import parse_number, parse_date, parse_bet
from ..readers import csv_reader
from .extract_numbers import extract_numbers

__all__ = ['extract_bets']


BETS_CSV = BASE_DIR / 'core/data/apostas.csv'

def extract_bets() -> Optional[list[dict]]:
    bets = []
    if not BETS_CSV.exists():
        return None
    content = csv_reader(BETS_CSV)
    parsed = parse_bet(content)
    if parsed:
        for item in parsed:
            bets.append(
                {
                    'id': parse_number(item['id'], integer=True),
                    'date': parse_date(item['data']),
                    'value': parse_number(item['valor'], money=True),
                    'initial': parse_number(item['inicial'], integer=True),
                    'final': parse_number(item['final'], integer=True),
                    'numbers': extract_numbers(item, 'num'),
                }
            )
    return bets
