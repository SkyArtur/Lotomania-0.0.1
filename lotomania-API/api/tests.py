from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from core.models import Bet, BettorUser


class BettorRegistrationTests(APITestCase):
    def setUp(self):
        self.url = reverse('api:bettors-list')

    def test_register_creates_user_with_hashed_password(self):
        response = self.client.post(self.url, {'username': 'johndoe', 'password': 'S3nhaForte!23'})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn('password', response.data)

        user = BettorUser.objects.get(username='johndoe')
        self.assertTrue(user.check_password('S3nhaForte!23'))

    def test_register_does_not_require_authentication(self):
        response = self.client.post(self.url, {'username': 'anonymous', 'password': 'S3nhaForte!23'})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_rejects_duplicate_username(self):
        BettorUser.objects.create_user(username='johndoe', password='S3nhaForte!23')

        response = self.client.post(self.url, {'username': 'johndoe', 'password': 'OutraSenha!45'})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_rejects_weak_password(self):
        response = self.client.post(self.url, {'username': 'johndoe', 'password': '123'})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_rejects_invalid_username(self):
        response = self.client.post(self.url, {'username': 'john_doe', 'password': 'S3nhaForte!23'})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class BettorMeTests(APITestCase):
    def setUp(self):
        self.url = reverse('api:bettors-me')
        self.user = BettorUser.objects.create_user(username='johndoe', password='S3nhaForte!23')

    def test_me_requires_authentication(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_returns_authenticated_user_data(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['username'], 'johndoe')


class TokenAuthTests(APITestCase):
    def setUp(self):
        self.user = BettorUser.objects.create_user(username='johndoe', password='S3nhaForte!23')

    def test_obtain_token_with_valid_credentials(self):
        response = self.client.post(
            reverse('token_obtain_pair'),
            {'username': 'johndoe', 'password': 'S3nhaForte!23'}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_obtain_token_with_invalid_credentials_is_rejected(self):
        response = self.client.post(
            reverse('token_obtain_pair'),
            {'username': 'johndoe', 'password': 'senha-errada'}
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class BetOwnershipTests(APITestCase):
    def setUp(self):
        self.user_a = BettorUser.objects.create_user(username='usera', password='S3nhaForte!23')
        self.user_b = BettorUser.objects.create_user(username='userb', password='S3nhaForte!23')
        self.bets_url = reverse('api:bets-list')
        self.bet_payload = {
            'date': '2026-01-01',
            'value': '5.00',
            'initial': 1,
            'final': 2,
            'mirror': True,
            'numbers': list(range(50)),
        }

    def _create_bet_as(self, user):
        self.client.force_authenticate(user=user)
        response = self.client.post(self.bets_url, self.bet_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return Bet.objects.filter(bettor=user).latest('id')

    def test_create_bet_requires_authentication(self):
        response = self.client.post(self.bets_url, self.bet_payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_bet_assigns_authenticated_user_as_bettor(self):
        bet = self._create_bet_as(self.user_a)

        self.assertEqual(bet.bettor, self.user_a)

    def test_user_only_sees_own_bets_in_list(self):
        self._create_bet_as(self.user_a)
        self._create_bet_as(self.user_b)

        self.client.force_authenticate(user=self.user_a)
        response = self.client.get(self.bets_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_user_cannot_retrieve_other_users_bet(self):
        bet = self._create_bet_as(self.user_a)

        self.client.force_authenticate(user=self.user_b)
        response = self.client.get(reverse('api:bets-detail', kwargs={'id': bet.id}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_latest_action_ignores_other_users_bets(self):
        self._create_bet_as(self.user_a)

        self.client.force_authenticate(user=self.user_b)
        response = self.client.get(reverse('api:bets-latest'))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
