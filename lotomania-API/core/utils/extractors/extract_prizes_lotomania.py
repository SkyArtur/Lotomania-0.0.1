from ..parsers import parse_number

__all__ = ['extract_prizes_lotomania']


def extract_prizes_lotomania(datas: dict) -> list[dict]:

    prizes = []
    for _index in [0, *(n for n in range(15, 21))]:
        prizes.append(
            {
                'points': _index,
                'winners': parse_number(datas[f'ganhadores_{_index}'], integer=True),
                'value': parse_number(datas[f'rateio_{_index}'], money=True)
            }
        )
    return prizes
