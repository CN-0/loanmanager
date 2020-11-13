from django.test import TestCase
from ..models import User


class UserTest(TestCase):
    def setUp(self):
        User.objects.create(
            username="naveen", email="kongara@gmail.com", password="1234", user_type="M")

    def test_user_email(self):
        test_user = User.objects.get(username="naveen")
        self.assertEqual(test_user.get_email(), "kongara@gmail.com")
