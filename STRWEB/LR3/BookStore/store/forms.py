from django import forms
from login.models import CustomUser
from store.models import Book, Comment, INT_CHOICES, Contact, RotationTime


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'summary', 'imprint', 'image', 'ISBN', 'genre', 'language','cost']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text', 'mark']
        widgets = {'mark': forms.Select(choices=INT_CHOICES),
                   'text': forms.Textarea(attrs={'spellcheck': 'true', 'dir': 'auto'})}
        
class UserProfileForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'date_of_birth', 'email', 'phone_number', 'avatar']
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
        }

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ["full_name", "photo_url", "job_description", "phone", "email"]

class RotationTimeForm(forms.ModelForm):
    class Meta:
        model = RotationTime
        fields = ['time']
        labels = {'time': 'Задержка смены слайдов (в миллисекундах)'}
        widgets = {
            'time': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '1', 
                'step': '1'
            })
        }