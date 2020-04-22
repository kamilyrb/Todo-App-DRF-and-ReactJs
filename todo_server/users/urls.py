from django.urls import path

from users.views import UserCreateView

urlpatterns = [
    path('signup', UserCreateView.as_view(), name='users-register-url'),
]
