from ..parsers import parse_number, parse_date

__all__ = ['extract_basic_data_lotomania']


def extract_basic_data_lotomania(datas: dict) -> dict:

    return {
        'reference': parse_number(datas['concurso'], integer=True),
        'date': parse_date(datas['data sorteio']),
    }
