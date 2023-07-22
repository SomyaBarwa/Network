from django import forms
from .models import *

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image','bio']
        widgets = {
            'bio': forms.Textarea(attrs={'rows':3, 'cols':100, 'class':'form-control my-3'}),
        }
        labels = {
            "bio": "",
        }



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('comment',)
        widgets = {
            'comment': forms.Textarea(attrs={'rows':5, 'cols':100, 'placeholder': "Write a commie", 'class':'form-control'}),
        }
        labels = {
            "comment": "",
        }
