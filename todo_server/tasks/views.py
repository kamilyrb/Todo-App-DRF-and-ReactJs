from rest_framework import generics

from tasks.models import Task
from tasks.serializers import TaskSerializer, TaskSaveSerializer, TaskUpdateSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_serializer_class(self):
        return TaskSerializer if self.request.method == 'GET' else TaskSaveSerializer


class TaskDestroyUpdateView(generics.DestroyAPIView, generics.UpdateAPIView):
    serializer_class = TaskUpdateSerializer
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
