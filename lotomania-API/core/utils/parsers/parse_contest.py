from typing import Optional

__all__ = ['parse_contest']


def parse_contest(content: list[dict]) -> Optional[list[dict]]:
    try:
        data_contest = []
        for contest in content:
            parser = {}
            for key, value in contest.items():
                if 'Ganhadores' in key or 'Rateio' in key:
                    _key = key.split(' ')
                    parser[f'{_key[0].lower()}_{_key[1] if _key[1] != "Nenhum" else "0"}'] = value
                else:
                    parser[key.lower()] = value
            data_contest.append(parser)
        return data_contest
    except (TypeError, AttributeError, ValueError, Exception) as error:
        return None
