from django.db.models.expressions import F
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth import authenticate
from django.contrib.auth import login as login_user

from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework import status

from .forms import EditProfileForm, CreateExperienceForm, CreateAchievementForm, CreateSkillForm, CreateProjectForm

from info.models import Skill, Achievement, Experience, Information, Message, Project


class CsrfExemptSessionAuthentication(authentication.SessionAuthentication):
    def enforce_csrf(self, request):
        return

# we use this class to login and check the user if she/he logged in.
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [CsrfExemptSessionAuthentication]
    def post(self, request):
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        
        if not username or not password:
            return render(request, "login.html", {'message': 'Please enter both username and password'})

        user = authenticate(
            username = username,
            password = password
            )
        if user:
            login_user(request, user)
            return redirect('dashboard:dashboard')
        return render(request, "login.html", {'message': 'Invalid Username or Password'})

    def get(self, request):
            return render(request, "login.html", {})


@login_required()
def dashboard(request):
    template_name = 'dashboard.html'
    profile = Information.objects.first()
    return render(request, template_name, {'dashboard': True, 'profile_active': False, 'messages_active': False, 'experiences_active': False, 'achievements_active': False, 'skills_active': False, 'projects_active': False, 'profile': profile})


@login_required()
def profile(request):
    template_name = 'profile.html'
    context = {}
    profile = Information.objects.first()
    context.update({'dashboard': False, 'profile_active': True, 'messages_active': False, 'experiences_active': False, 'achievements_active': False, 'skills_active': False, 'projects_active': False, 'profile': profile})
    return render(request, template_name, context)


@login_required()
def profile_edit(request):
    if request.method == 'POST':
        instance = Information.objects.first()

        avatar = request.FILES.get('avatar', False)
        cv = request.FILES.get('cv', False)
        if avatar:
            instance.avatar = avatar
            instance.save()
            return redirect('dashboard:profile')
        else:
            if cv:
                instance.cv = cv
                instance.save()
            form = EditProfileForm(instance=instance, data=request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': True})
            return JsonResponse({'success': False, 'errors': form.errors})
    return JsonResponse({'status':'bad request'})


@login_required()
def messages(request):
    template_name = 'messages.html'
    context = {}
    profile = Information.objects.first()
    messages = Message.objects.all().order_by('-send_time')

    page = request.GET.get('page', 1)

    paginator = Paginator(messages, 6)

    try:
        messages = paginator.page(page)
    except PageNotAnInteger:
        messages = paginator.page(1)
    except EmptyPage:
        messages = paginator.page(paginator.num_pages)

    context.update({'dashboard': False, 'profile_active': False, 'messages_active': True, 'experiences_active': False, 'achievements_active': False, 'skills_active': False, 'projects_active': False, 'messages': messages, 'profile': profile})
    return render(request, template_name, context)

@login_required()
def messages_api(request):
    if request.method == 'POST':
        type = request.POST.get('option_type')
        message_id = request.POST.get('message_id')
        if type == "delete":
            message = Message.objects.get(id=int(message_id))
            message.delete()
            return JsonResponse({'status': 'success'})
        elif type == "view":
            message = Message.objects.get(id=int(message_id))
            if not message.is_read:
                message.is_read = True
                message.save()
            return JsonResponse({'status': 'success'})
        elif type == "search":
            search_text = request.POST.get('search_text')

            lookups = Q(name__icontains=search_text) | Q(
                email__icontains=search_text) | Q(message__icontains=search_text)

            messages = Message.objects.filter(lookups).values()
            messages = list(messages)

            return JsonResponse({'status': 'success', 'messages': messages})
    return JsonResponse({'status': 'bad request'})


@login_required()
def experiences(request):
    template_name = 'dashboard_experiences.html'
    context = {}
    profile = Information.objects.first()
    experiences = Experience.objects.all().order_by('-id')
    context.update({'dashboard': False, 'profile_active': False, 'messages_active': False, 'experiences_active': True, 'achievements_active': False, 'skills_active': False, 'projects_active': False, 'experiences': experiences, 'profile': profile})
    return render(request, template_name, context)


@login_required()
def experiences_edit(request):
    if request.method == 'POST':

        if request.POST.get('type') == 'create':
            form = CreateExperienceForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'status': 'Create Experience Successfully', 'code': 200})
            else:
                return JsonResponse({'status': 'Create Experience Failed', 'code': 400, 'errors': form.errors})

        elif request.POST.get('type') == 'update':
            id = int(request.POST.get('id'))
            if request.POST.get('first', False):
                experiences = Experience.objects.filter(id=id).values()
                return JsonResponse({'experience':list(experiences)[0], 'code': 200})
            else:
                experiences = Experience.objects.get(id=id)
                form = CreateExperienceForm(request.POST, instance=experiences)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'status': 'Update Experience Successfully', 'code': 200})
                else:
                    return JsonResponse({'status': 'Update Experience Failed', 'code': 400, 'errors': form.errors})

        elif request.POST.get('type') == 'delete':
            id = int(request.POST.get('id'))
            Experience.objects.filter(id=id).delete()
            return JsonResponse({'status': 'Remove Experience Successfully', 'code': 200})

    return JsonResponse({'status': 'Bad Request'})


@login_required()
def achievements(request):
    template_name = 'dashboard_achievements.html'
    context = {}
    profile = Information.objects.first()
    achievements = Achievement.objects.all().order_by('-id')
    context.update({'dashboard': False, 'profile_active': False, 'messages_active': False, 'experiences_active': False, 'achievements_active': True, 'skills_active': False, 'projects_active': False, 'achievements': achievements, 'profile': profile})
    return render(request, template_name, context)


@login_required()
def achievements_edit(request):
    if request.method == 'POST':

        if request.POST.get('type') == 'create':
            form = CreateAchievementForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'status': 'Create Achievement Successfully', 'code': 200})
            else:
                return JsonResponse({'status': 'Create Achievement Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'update':
            id = int(request.POST.get('id'))
            if request.POST.get('first', False):
                achievements = Achievement.objects.filter(id=id).values()
                return JsonResponse({'achievement':list(achievements)[0], 'code': 200})
            else:
                achievements = Achievement.objects.get(id=id)
                form = CreateAchievementForm(request.POST, instance=achievements)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'status': 'Update Achievement Successfully', 'code': 200})
                else:
                    return JsonResponse({'status': 'Update Achievement Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'delete':
            id = int(request.POST.get('id'))
            Achievement.objects.filter(id=id).delete()
            return JsonResponse({'status': 'Remove Achievement Successfully', 'code': 200})

    return JsonResponse({'status': 'Bad Request'})


@login_required()
def skills(request):
    template_name = 'dashboard_skills.html'
    context = {}
    profile = Information.objects.first()
    skills = Skill.objects.all().order_by('-id')
    context.update({'dashboard': False, 'profile_active': False, 'messages_active': False, 'experiences_active': False, 'achievements_active': False, 'skills_active': True, 'projects_active': False, 'skills': skills, 'profile': profile})
    return render(request, template_name, context)


@login_required()
def skills_edit(request):
    if request.method == 'POST':

        if request.POST.get('type') == 'create':
            form = CreateSkillForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return JsonResponse({'status': 'Create Skill Successfully', 'code': 200})
            else:
                return JsonResponse({'status': 'Create Skill Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'update':
            id = int(request.POST.get('id'))
            if request.POST.get('first', False):
                skills = Skill.objects.filter(id=id).values()
                return JsonResponse({'skill':list(skills)[0], 'code': 200})
            else:
                skills = Skill.objects.get(id=id)
                form = CreateSkillForm(request.POST, request.FILES, instance=skills)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'status': 'Update Skill Successfully', 'code': 200})
                else:
                    return JsonResponse({'status': 'Update Skill Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'delete':
            id = int(request.POST.get('id'))
            Skill.objects.filter(id=id).delete()
            return JsonResponse({'status': 'Remove Skill Successfully', 'code': 200})

    return JsonResponse({'status': 'Bad Request'})


@login_required()
def projects(request):
    template_name = 'dashboard_projects.html'
    context = {}
    profile = Information.objects.first()
    projects = Project.objects.all().order_by('-id')
    context.update({'dashboard': False, 'profile_active': False, 'messages_active': False, 'experiences_active': False, 'achievements_active': False, 'skills_active': False, 'projects_active': True, 'projects': projects, 'profile': profile})
    return render(request, template_name, context)

@login_required()
def projects_edit(request):
    if request.method == 'POST':

        if request.POST.get('type') == 'create':
            form = CreateProjectForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()
                return JsonResponse({'status': 'Create Project Successfully', 'code': 200})
            else:
                return JsonResponse({'status': 'Create Project Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'update':
            id = int(request.POST.get('id'))
            if request.POST.get('first', False):
                project = Project.objects.filter(id=id).values()
                return JsonResponse({'project':list(project)[0], 'code': 200})
            else:
                project = Project.objects.get(id=id)
                form = CreateProjectForm(request.POST, request.FILES, instance=project)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'status': 'Update Project Successfully', 'code': 200})
                else:
                    return JsonResponse({'status': 'Update Project Failed', 'code': 400, 'errors':form.errors})

        elif request.POST.get('type') == 'delete':
            id = int(request.POST.get('id'))
            Project.objects.filter(id=id).delete()
            return JsonResponse({'status': 'Remove Project Successfully', 'code': 200})

    return JsonResponse({'status': 'Bad Request'})