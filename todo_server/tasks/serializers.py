from django.db import transaction
from rest_framework import serializers

from tags.enums import ColorTypes
from tags.models import Tag
from tasks.models import Task


class TagSerialzer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    color = serializers.ChoiceField(choices=ColorTypes.get_values())

    class Meta:
        model = Tag
        exclude = ['task']

    def validate(self, attrs):
        attrs['task'] = self.context['task']
        return attrs


class TaskSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'is_completed', 'created_at', 'tags']

    def get_tags(self, obj: Task):
        return TagSerialzer(obj.tag_set.all(), many=True).data

    def get_created_at(self,obj: Task):
        return obj.created_at.strftime("%m/%d/%Y, %H:%M")


class TaskSaveSerializer(serializers.ModelSerializer):
    tags = serializers.ListField()

    class Meta:
        model = Task
        fields = ['title', 'description', 'tags']

    def validate(self, attrs):
        attrs['user'] = self.context['user']
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        tags = validated_data.pop('tags')
        task = super().create(validated_data)
        serializer = TagSerialzer(data=tags, context={'task': task}, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return TaskSerializer(task).data


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['is_completed']
