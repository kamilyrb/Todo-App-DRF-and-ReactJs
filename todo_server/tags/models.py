from django.db import models

from tags.enums import ColorTypes
from tasks.models import Task


class Tag(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    color = models.CharField(choices=ColorTypes.choices(), max_length=15)

    def __str__(self):
        return self.name
