from rest_framework import serializers
from .models import Project , TimeEntry

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model= Project
        fields= ('id', 'name', 'description', 'created_at', 'updated_at')


class TimeEntrySerializer(serializers.ModelSerializer):
    project_name = serializers.ReadOnlyField(source="project.name")
    task_start = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    task_end = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model= TimeEntry
        extra_kwargs = {
            'url': {'view_name': 'project-detail', 'lookup_field': 'id'},
        }
        fields= ('id', 'task_name', 'task_description', 'user','project_name','project', 'task_start', 'task_end')
