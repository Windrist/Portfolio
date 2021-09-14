from django.urls import path
from django.contrib.auth.views import LogoutView

from .views import (
    dashboard,
    profile,
    profile_edit,
    messages,
    messages_api,
    experiences,
    experiences_edit,
    achievements,
    achievements_edit,
    skills,
    skills_edit,
    projects,
    projects_edit,
    LoginView,
    )

app_name = 'dashboard'
urlpatterns = [

    path('', dashboard, name='dashboard'),

    path('profile', profile, name='profile'),
    path('profile/edit/', profile_edit, name='profile_edit'),

    path('messages', messages, name='messages'),
    path('messages/api/', messages_api, name='messages_api'),

    path('experiences', experiences, name='experiences'),
    path('experiences/edit/', experiences_edit, name='experiences_edit'),
    
    path('achievements', achievements, name='achievements'),
    path('achievements/edit/', achievements_edit, name='achievements_edit'),
    
    path('skills', skills, name='skills'),
    path('skills/edit/', skills_edit, name='skills_edit'),

    path('projects', projects, name='projects'),
    path('projects/edit/', projects_edit, name='projects_edit'),

    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
