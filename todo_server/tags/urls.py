from django.urls import path

from tags.views import TagDestroyView

urlpatterns = [
    path('/<int:pk>', TagDestroyView.as_view(), name='tag_destroy_view'),
]
