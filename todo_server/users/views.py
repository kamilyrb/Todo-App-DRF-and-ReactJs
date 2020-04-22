from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny

from users.serializers import UsersSerializer


class UserCreateView(generics.CreateAPIView):
    permission_classes = (AllowAny, )
    queryset = User.objects.all()
    serializer_class = UsersSerializer
