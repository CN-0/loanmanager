import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import User
from ..serializers import UserSerializer

client = Client()


class RegisterTest(TestCase):
    def setUp(self):
        self.valid_payload = {
            'username': 'Kongara',
            'email': 'kon@gmail.com',
            'password': '1234',
            'user_type': 'C'
        }

        self.invalid_payload = {
            'username': '',
            'email': 'kon',
            'password': 'kk',
            'user_type': 'P'
        }

    def test_user_register(self):
        response = client.post(
            reverse('register'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginTest(TestCase):
    def setUp(self):
        client.post(
            reverse('register'),
            data=json.dumps({
                'username': 'Kongara',
                'email': 'kon@gmail.com',
                'password': '1234',
                'user_type': 'C'
            }),
            content_type='application/json'
        )
        self.valid_payload = {
            'username': 'Kongara',
            'password': '1234'
        }

        self.invalid_payload = {
            'username': '',
            'password': 'kk'
        }

    def test_user_login(self):
        response = client.post(
            reverse('login'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
