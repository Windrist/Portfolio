from django.contrib import admin
from .models import Skill, Experience, Achievement, Project, Message, Information


admin.site.register(Information)
admin.site.register(Experience)
admin.site.register(Achievement)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(Message)
