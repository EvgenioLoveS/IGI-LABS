from django.db import models
from django.urls import reverse
from datetime import date
from django.core.validators import MinValueValidator, MaxValueValidator
from login.models import CustomUser

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter author name') 
    date_of_birth = models.DateField()
    date_of_death = models.DateField()

    class Meta:
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'

    def get_absolute_url(self):
        return reverse('store:author-detail', args=[str(self.id)])

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter genre name')
    
    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'
    
    def get_absolute_url(self):
        return reverse('store:book_list_by_genre', args=[str(self.name)])

    def __str__(self):
        return self.name

class Language(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter language name')
    
    class Meta:
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'
    
    def get_absolute_url(self):
        return reverse('store:book_list_by_language', args=[str(self.name)])

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200,
                            help_text='Enter book title')
    author = models.ForeignKey(Author, on_delete = models.CASCADE)
    summary = models.CharField(max_length=200,
                            help_text='Enter book description')
    imprint = models.CharField(max_length=200,
                            help_text='Enter imprint')
    image = models.ImageField(upload_to='book/%Y/%m/%d', blank=True)
    ISBN = models.CharField(max_length=200,
                            help_text='Enter ISBN')
    quantity = models.IntegerField()
    purchase_count = models.PositiveIntegerField(default=0)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    cost = models.IntegerField()
    LOAN_STATUS = (
        ('A', 'available'),
        ('U', 'unavailable')
    )
    status = models.CharField(max_length=1,
                            choices=LOAN_STATUS,
                            help_text="units of product")
    
    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

    def get_absolute_url(self):
        return reverse('store:book_detail', args=[str(self.id)])

    def __str__(self):
        return self.title

class Client(models.Model) :

    first_name = models.CharField(max_length=200,
                                help_text='Enter first name')
    last_name = models.CharField(max_length=200,
                                help_text='Enter last name')
    date_of_birth = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=50,
                                    help_text='Enter phone number')
    
    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'
    
    def get_absolute_url(self):
        return reverse('client-detail', args=[str(self.id)])

    def __str__(self) :
        return '{0}, {1}'.format(self.first_name, self.last_name) 
    
class History(models.Model):
    year = models.PositiveIntegerField(
            validators=[
                MinValueValidator(1900), 
                MaxValueValidator(date.today().year)],
                help_text="Use the following format: YYYY")
    description = models.TextField()

    class Meta:
        verbose_name = 'История'
        verbose_name_plural = 'Истории'

    def __str__(self):
        return self.description
    
class Article(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=200)
    short = models.TextField()
    full = models.TextField()
    author_art = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    img = models.ImageField()

    class Meta:
        verbose_name = 'Статья'
        verbose_name_plural = 'Статьи'

class Adversisment(models.Model):
    company_name=models.CharField(max_length=200)
    text = models.CharField(max_length=200)
    img = models.ImageField()
    link = models.CharField(max_length = 200)

    class Meta:
        verbose_name = 'Реклама'
        verbose_name_plural = 'Рекламы'

class Partner(models.Model):
    company_name=models.CharField(max_length=200)
    img = models.ImageField()
    link = models.CharField(max_length = 200)

    class Meta:
        verbose_name = 'Партнер'
        verbose_name_plural = 'Партнеры'

class Vacancy(models.Model):
    name = models.CharField(max_length=200)
    salary = models.IntegerField()
    description = models.TextField()

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

class FAQ(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()
    date = models.DateField()

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

class WorkerPosition(models.Model):
    worker = models.OneToOneField(CustomUser, on_delete=models.CASCADE, 
                               limit_choices_to={'is_staff': True})
    img = models.ImageField()
    description = models.TextField()

    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

INT_CHOICES = [(x, "★"*x) for x in range(1, 6)]

class Comment(models.Model):
    

    date = models.DateField()
    mark = models.IntegerField(choices=INT_CHOICES, validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    text = models.TextField()

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

class RotationTime(models.Model):
    time = models.IntegerField()
