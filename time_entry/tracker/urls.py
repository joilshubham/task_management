from rest_framework import routers
from django.urls import path, include

from . import views


urlpatterns = [
    path('project/<int:id>', views.project_by_user),
    path('time_entry/<int:id>', views.time_entry_by_user),
    path('end_task/<int:id>', views.time_entry_end_task),
    path('add_task/<int:id>', views.add_task),
]