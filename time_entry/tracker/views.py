from .models import Project, TimeEntry
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from user.models import  CustomUser
from .serializers import ProjectSerializer, TimeEntrySerializer
from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def project_by_user(request, id):
    if not request.method == 'GET':
        return JsonResponse({'error':'Send a get request with correct user id'})

    user = CustomUser.objects.get(id = id)
    project = Project.objects.filter(users = user)
    serialized = ProjectSerializer(project, many = True)
    return JsonResponse(serialized.data, safe=False)

@csrf_exempt
def time_entry_by_user(request, id):
    if not request.method == 'GET':
        return JsonResponse({'error':'Send a get request with correct user id'})

    user = CustomUser.objects.get(id = id)
    time_entry = TimeEntry.objects.filter(user = user)
    print(time_entry.values())
    serialized = TimeEntrySerializer(time_entry, context={'request': request}, many = True)
    return JsonResponse(serialized.data, safe=False)

@csrf_exempt
def time_entry_end_task(request, id):
    if not request.method == 'POST':
        return JsonResponse({'error':'Send a post request with correct parameters'})

    task = TimeEntry.objects.get(id = id)
    task.task_end = request.POST.get('task_end')
    print(task)
    task.save()
    serialized = TimeEntrySerializer(task, context={'request': request})
    return JsonResponse(serialized.data)

@csrf_exempt
def add_task(request, id):
    if not request.method == 'POST':
        return JsonResponse({'error':'Send a post request with correct parameters'})
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid user ID'})
    
    task_name = request.POST.get('task_name')
    task_description = request.POST.get('task_description')
    project_id = request.POST.get('project')
    project = Project.objects.get(id = int(project_id))
    task_start = request.POST.get('task_start')
    task_end = request.POST.get('task_end')
    try:
        task = TimeEntry.objects.create(task_name= task_name, task_description=task_description, project= project,user =user,task_end= task_end)
    except:
        task = TimeEntry.objects.create(task_name= task_name, task_description=task_description, project= project,user =user, task_start= task_start,task_end= task_end)
    task.save()

    res_data = {
        'message': 'Task created succesfully',
        'success': True,
        'error': False
    }
    return JsonResponse(res_data)