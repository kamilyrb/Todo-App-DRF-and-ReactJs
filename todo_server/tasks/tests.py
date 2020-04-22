import json

from django.urls import reverse
from rest_framework.test import APITestCase


class TasksTest(APITestCase):
    username = 'test_user'
    password = 'test_password'

    def create_user(self):
        data = {'first_name': 'Name', 'last_name': 'Last Name', 'email': 'test@mail.com', 'username': self.username,
                'password': self.password}
        return self.client.post(reverse('users-register-url'), json.dumps(data), content_type='application/json')

    def get_token(self):
        self.create_user()
        data = {'username': self.username, 'password': self.password}
        response =  self.client.post(reverse('token_obtain_pair'), json.dumps(data), content_type='application/json').json()
        return response['access']

    def create_task_response(self):
        data = {"title": "task test", "description": "test desc", "tags": [{"name": "tag test", "color": "secondary"}]}
        return self.client.post(reverse('task_list_create_view'), json.dumps(data), content_type='application/json')

    def setUp(self) -> None:
        token = self.get_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer {}'.format(token))

    def test_get_tasks(self):
        response = self.client.get(reverse('task_list_create_view'), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_create_task(self):
        response = self.create_task_response()
        self.assertEqual(response.status_code, 200)

    def test_change_status_task(self):
        data = {"title": "task test","description": "test desc","tags": [{"name": "tag test","color": "secondary"}]}
        response = self.client.post(reverse('task_list_create_view'),json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)


