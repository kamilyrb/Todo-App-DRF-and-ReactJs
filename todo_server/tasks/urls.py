from django.urls import path

from tasks.views import TaskListCreateView, TaskDestroyUpdateView

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task_list_create_view'),
    path('/<int:pk>', TaskDestroyUpdateView.as_view(), name='task_destroy_update_view'),
]
