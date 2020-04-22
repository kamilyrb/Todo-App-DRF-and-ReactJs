import json

from django.urls import reverse
from rest_framework.test import APITestCase


class UsersApiTest(APITestCase):
    username = 'test_user'
    password = 'test_pass'
    def create_user(self):
        data = {'first_name': 'Name', 'last_name': 'Last Name', 'email': 'test@mail.com', 'username': self.username,
                'password': self.password}
        return self.client.post(reverse('users-register-url'), json.dumps(data), content_type='application/json')

    def get_token_response(self):
        self.create_user()
        data = {'username': self.username, 'password': self.password}
        return self.client.post(reverse('token_obtain_pair'), json.dumps(data), content_type='application/json')


    def test_signup(self):
        response = self.create_user()
        self.assertEqual(response.status_code, 201)

    def test_duplicate_username_signup(self):
        response_success = self.create_user()
        self.assertEqual(response_success.status_code, 201)
        response_error = self.create_user()
        self.assertEqual(response_error.status_code, 400)

    def test_get_token(self):
        response = self.get_token_response()
        self.assertEqual(response.status_code, 200)
