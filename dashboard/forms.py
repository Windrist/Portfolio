from django import forms
from info.models import Information, Achievement, Experience, Skill, Project

class EditProfileForm(forms.ModelForm):
	
	class Meta:
		model = Information
		exclude = ('born_date', 'address', 'cv')

class CreateExperienceForm(forms.ModelForm):
	
	class Meta:
		model = Experience
		fields = "__all__"

class CreateAchievementForm(forms.ModelForm):
	
	class Meta:
		model = Achievement
		fields = "__all__"

class CreateSkillForm(forms.ModelForm):
	
	class Meta:
		model = Skill
		fields = "__all__"

class CreateProjectForm(forms.ModelForm):

	class Meta:
		model = Project
		exclude = ('Slug',)
