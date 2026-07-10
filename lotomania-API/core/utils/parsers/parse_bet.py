from typing import Optional

__all__ = ['parse_bet']


def parse_bet(content: list[dict]) -> Optional[list[dict]]:
    try:
        data_bets = []
        for bet in content:
            parser = {}
            for key, value in bet.items():
                parser[key.lower()] = value
            data_bets.append(parser)
        return data_bets
    except (TypeError, AttributeError, ValueError, Exception):
        return None
