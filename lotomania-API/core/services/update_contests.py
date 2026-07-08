from typing import NamedTuple

from django.db import IntegrityError, transaction

from core.models import Contest
from core.utils import extract_contests
from api.services.creates import (
    create_contest,
    bulk_create_any_number,
    bulk_create_contest_prize,
    bulk_create_bet_contest,
    bulk_create_bet_result,
    bulk_create_bet_prize,
)

__all__ = ['update_contests', 'UpdateContestsResult']


class UpdateContestsResult(NamedTuple):
    created: list[Contest]
    failed: list[tuple[int, str]]


def update_contests() -> UpdateContestsResult:
    contest_data = extract_contests()
    if not contest_data:
        return UpdateContestsResult(created=[], failed=[])

    registered = set(Contest.objects.values_list('reference', flat=True))
    new_items = sorted(
        (item for item in contest_data if item['contest']['reference'] not in registered),
        key=lambda item: item['contest']['reference']
    )

    created, failed = [], []
    for item in new_items:
        reference = item['contest']['reference']
        try:
            with transaction.atomic():
                contest = create_contest(item['contest'])
                bulk_create_any_number(contest, item['numbers'])
                bulk_create_contest_prize(contest, item['prizes'])
                bulk_create_bet_contest(contest)
                bulk_create_bet_result(contest)
                bulk_create_bet_prize(contest)
            created.append(contest)
        except (IntegrityError, KeyError, TypeError) as error:
            failed.append((reference, str(error)))

    return UpdateContestsResult(created=created, failed=failed)
