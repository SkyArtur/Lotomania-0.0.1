from datetime import date
from unittest.mock import patch

from django.test import TestCase

from core.models import Bet, BetContest, BetPrize, BetResult, BettorUser, Contest, Number
from core.services import update_contests

FAKE_REFERENCE = 999999


def _fake_contest_data(hit_numbers: list[int]) -> list[dict]:
    return [
        {
            'contest': {'reference': FAKE_REFERENCE, 'date': date(2026, 1, 5)},
            'numbers': hit_numbers,
            'prizes': [
                {'points': 0, 'winners': 0, 'value': 0},
                {'points': 15, 'winners': 0, 'value': 0},
                {'points': 16, 'winners': 0, 'value': 0},
                {'points': 17, 'winners': 0, 'value': 0},
                {'points': 18, 'winners': 0, 'value': 0},
                {'points': 19, 'winners': 0, 'value': 0},
                {'points': 20, 'winners': 5, 'value': '1000.00'},
            ],
        }
    ]


class UpdateContestsTests(TestCase):
    def setUp(self):
        self.bettor = BettorUser.objects.create_user(username='tester1', password='S3nhaForte!23')
        self.bet_numbers = list(Number.objects.order_by('value')[:50])
        self.bet = Bet.objects.create(
            date=date(2026, 1, 1),
            value='5.00',
            initial=1,
            final=FAKE_REFERENCE,
            mirror=True,
            bettor=self.bettor,
        )
        self.bet.numbers.add(*self.bet_numbers)

    def test_returns_empty_result_when_csv_has_no_data(self):
        with patch('core.services.update_contests.extract_contests', return_value=None):
            result = update_contests()

        self.assertEqual(result.created, [])
        self.assertEqual(result.failed, [])

    def test_creates_new_contest_and_updates_matching_bet(self):
        hit_values = [n.value for n in self.bet_numbers[:20]]
        with patch('core.services.update_contests.extract_contests', return_value=_fake_contest_data(hit_values)):
            result = update_contests()

        self.assertEqual([c.reference for c in result.created], [FAKE_REFERENCE])
        self.assertEqual(result.failed, [])

        contest = Contest.objects.get(reference=FAKE_REFERENCE)
        self.assertTrue(BetContest.objects.filter(bet=self.bet, contest=contest).exists())

        bet_result = BetResult.objects.get(bet=self.bet, contest=contest)
        self.assertEqual(bet_result.hits, 20)
        self.assertEqual(bet_result.mirror_hits, 0)

        bet_prize = BetPrize.objects.get(bet=self.bet, contest=contest, points=20)
        self.assertEqual(str(bet_prize.value), '1000.00')

    def test_does_not_link_bet_outside_contest_range(self):
        self.bet.final = FAKE_REFERENCE - 1
        self.bet.save()

        hit_values = [n.value for n in self.bet_numbers[:20]]
        with patch('core.services.update_contests.extract_contests', return_value=_fake_contest_data(hit_values)):
            update_contests()

        contest = Contest.objects.get(reference=FAKE_REFERENCE)
        self.assertFalse(BetContest.objects.filter(bet=self.bet, contest=contest).exists())

    def test_is_idempotent_for_already_registered_contests(self):
        hit_values = [n.value for n in self.bet_numbers[:20]]
        fake_data = _fake_contest_data(hit_values)
        with patch('core.services.update_contests.extract_contests', return_value=fake_data):
            update_contests()
            second_result = update_contests()

        self.assertEqual(second_result.created, [])
        self.assertEqual(Contest.objects.filter(reference=FAKE_REFERENCE).count(), 1)
