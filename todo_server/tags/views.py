
from rest_framework import generics
from tags.models import Tag


class TagDestroyView(generics.DestroyAPIView):
    def get_queryset(self):
        return Tag.objects.filter(task__user=self.request.user)
