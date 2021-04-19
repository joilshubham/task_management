from django.db import models
from datetime import datetime
from user.models import CustomUser

date_object = datetime.strptime('Mon, 23 May 2016 08:30:15 GMT', '%a, %d %B %Y %H:%M:%S GMT')

class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    users = models.ManyToManyField(CustomUser)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class TimeEntry(models.Model):
    task_name = models.CharField(max_length=50)
    task_description = models.CharField(max_length=250)
    project = models.ForeignKey(Project,on_delete= models.SET_NULL, blank= True, null= True)
    user = models.ForeignKey(CustomUser, on_delete= models.SET_NULL, blank= True, null= True)
    task_start = models.DateTimeField(default=datetime.now,null= False)
    task_end = models.DateTimeField(blank= True, null= True)

    def __str__(self):
        return self.task_name
