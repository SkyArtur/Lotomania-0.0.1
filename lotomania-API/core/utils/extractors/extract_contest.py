from typing import Optional

from config.settings import BASE_DIR
from .extract_prizes_lotomania import extract_prizes_lotomania
from .extract_basic_data_lotomania import extract_basic_data_lotomania
from .extract_numbers import extract_numbers
from ..parsers import parse_contest
from ..readers import csv_reader

__all__ = ['extract_contests']


CONTEST_CSV = BASE_DIR / 'core/data/lotomania.csv'

def extract_contests() -> Optional[list[dict]]:

    contests = []
    if not CONTEST_CSV.exists():
        return None
    content = csv_reader(CONTEST_CSV)
    parser = parse_contest(content)
    if parser:
        for item in parser:
            contests.append(
                {
                    'contest': extract_basic_data_lotomania(item),
                    'numbers': extract_numbers(item, 'bola'),
                    'prizes': extract_prizes_lotomania(item),
                }
            )
    return contests
