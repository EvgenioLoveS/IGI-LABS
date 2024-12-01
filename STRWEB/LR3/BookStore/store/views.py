
from collections import defaultdict
import json
import logging
import os
from django.conf import settings
from django.shortcuts import redirect, render, get_object_or_404
from matplotlib import pyplot as plt
import pytz

from order.models import Order, OrderItem
from store.models import Book, Client, Company, Genre, Language, Author, History, Article, Adversisment, \
                    Partner, Vacancy, FAQ, WorkerPosition, Comment, RotationTime, Banner, Contact
from login.models import CustomUser
from django.http import HttpResponseRedirect, JsonResponse
from django.http import HttpResponseNotFound
from django.core.exceptions import PermissionDenied
from store.forms import BookForm, CommentForm, UserProfileForm, ContactForm, RotationTimeForm
from django.db.models import Avg, Count, Sum
from cart.forms import CartAddBookForm
from statistics import median, mode
from coupons.models import Coupon
from datetime import date, datetime, timezone
from django.utils import timezone
import requests
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt



# Настройка базового конфигурации логирования
logging.basicConfig(
    level=logging.DEBUG,  # Уровень логирования
    format='%(levelname)s:%(asctime)s:%(message)s',  # Формат сообщений
    handlers=[
        logging.FileHandler('debug.log'),  # Запись в файл
        #logging.StreamHandler()  # Вывод в консоль
    ]
)


# Получение логгера
logger = logging.getLogger(__name__)


# Create your views here.
def book_list(request, book_genre_name=None):
    logger.info("Fetching book list.")
    genre_ = None
    genres = Genre.objects.all()
    books = Book.objects.all()
    sort_t = request.GET.get('sort')

    is_auth = request.user.is_authenticated

    if book_genre_name:
        genre_ = get_object_or_404(Genre, name=book_genre_name)
        books = books.filter(genre=genre_)

    if str(sort_t) == 'ascending':
        books = books.order_by('cost')
    elif str(sort_t) == 'descending':
        books = books.order_by('-cost')

    logger.debug(f"Books fetched: {books.count()} books.")

    return render(request, 'store/Book/list.html', {
        'genre': genre_, 'genres': genres, 'books': books, 'is_auth': is_auth
    })

def book_detail(request, id):
    logger.info(f"Fetching details for book ID: {id}")
    book = get_object_or_404(Book, id=id)
    cart_book_form = CartAddBookForm()

    joke = requests.get('https://official-joke-api.appspot.com/jokes/programming/random').json()[0]
    logger.debug(f"Joke fetched: {joke}")

    return render(request, 'store/Book/detail.html', {
        'book': book, 'cart_book_form': cart_book_form, 'joke': joke['setup'] + joke['punchline']
    })

def book_create(request):
    if not request.user.is_staff:
        logger.warning("Unauthorized access attempt to book_create by user: %s", request.user)
        raise PermissionDenied("Net dostupa")

    form = BookForm()

    if request.method == "POST":
        book = Book.objects.create(
            title=request.POST.get('title'),
            author=Author.objects.get(id=request.POST.get('author')),
            cost=request.POST.get('cost'),
            genre=Genre.objects.get(id=request.POST.get('genre')),
            quantity=0,
            ISBN=request.POST.get('ISBN'),
            imprint=request.POST.get('imprint'),
            summary=request.POST.get('summary'),
            image=request.POST.get('image'),
            language=Language.objects.get(id=request.POST.get('language'))
        )
        book.save()
        logger.info(f"Book created: {book.title}")
    else:
        return render(request, "store/Book/create.html", {"form": form})

    return HttpResponseRedirect("/books/")

def book_edit(request, id):
    if not request.user.is_staff:
        logger.warning("Unauthorized access attempt to book_edit by user: %s", request.user)
        raise PermissionDenied("Net dostupa")

    try:
        book = Book.objects.get(id=id)
        form = BookForm(initial={
            'title': book.title, 'author': book.author,
            'cost': book.cost, 'genre': book.genre,
            'ISBN': book.ISBN, 'imprint': book.imprint,
            'summary': book.summary, 'image': book.image,
            'language': book.language
        })

        if request.method == "POST":
            book.title = request.POST.get('title')
            book.author = Author.objects.get(id=request.POST.get('author'))
            book.cost = request.POST.get('cost')
            book.genre = Genre.objects.get(id=request.POST.get('genre'))
            book.quantity = 0
            book.ISBN = request.POST.get('ISBN')
            book.imprint = request.POST.get('imprint')
            book.summary = request.POST.get('summary')
            book.image = request.FILES.get('image')
            book.language = Language.objects.get(id=request.POST.get('language'))

            book.save()
            logger.info(f"Book edited: {book.title}")
            return HttpResponseRedirect("/books/")
        else:
            return render(request, "store/Book/edit.html", {"book": book, 'form': form})
    except Book.DoesNotExist:
        logger.error(f"Book with ID {id} does not exist")
        return HttpResponseNotFound("<h2>Book not found</h2>")

def book_delete(request, id):
    if not request.user.is_staff:
        logger.warning("Unauthorized access attempt to book_delete by user: %s", request.user)
        raise PermissionDenied("Net dostupa")

    try:
        book = Book.objects.get(id=id)
        book.delete()
        logger.info(f"Book deleted: {book.title}")
        return HttpResponseRedirect("/books/")
    except Book.DoesNotExist:
        logger.error(f"Book with ID {id} does not exist")
        return HttpResponseNotFound("<h2>Book not found</h2>")

def home(request):
    user_timezone = request.session.get('user_timezone', 'UTC')  # По умолчанию используем UTC
    current_time = timezone.now().astimezone(pytz.timezone(user_timezone))
    logger.info("Rendering home page")

    last_article = Article.objects.order_by('-date').first()
    partners = Partner.objects.all()
    company = Company.objects.first()  # Получаем первую компанию

    banners = Banner.objects.order_by('order')

    rotation_time = RotationTime.objects.first()  # Получаем текущую задержку
    form = RotationTimeForm(instance=rotation_time)

    if request.method == 'POST':
        if not request.user.is_superuser:  # Дополнительная проверка
            return redirect('store:home')
        form = RotationTimeForm(request.POST, instance=rotation_time)
        if form.is_valid():
            form.save()
            return redirect('store:home')  # Перезагрузка страницы для обновления

    return render(request, "store/Company/home.html", {
        "last_article": last_article, #list(Article.objects.all())[-1],
        "time": current_time.strftime('%d/%m/%Y %H:%M:%S'),
        "user_timezone": user_timezone,
        "partners": partners,
        "company": company,
        "banners": banners,
        'rotation_time': rotation_time.time if rotation_time  else 5000,  
        'form': form

    })


def about_company(request):

    logger.info("Fetching company details, history, and contact info")

    # Получаем данные о компании (если у вас всегда одна компания)
    company = Company.objects.first()
    
    # Получаем реквизиты компании через OneToOne связь
    contact_info = company.contact_info

    # Получаем историю компании через ForeignKey с related_name
    history = company.histories.all()

    # Группируем события по годам
    history_sorted = {}
    for event in history:
        if event.year not in history_sorted:
            history_sorted[event.year] = []
        history_sorted[event.year].append(event.description)

    # Преобразуем в список для шаблона
    history_list = sorted(history_sorted.items())

    logger.debug(f"Company history: {history_list}")

    return render(request, "store/Company/about.html", {
         "company": company,
         "contact_info": contact_info,
         "history": history_list,
     })

def workers_list(request):
    logger.info("Fetching workers list")
    workers = WorkerPosition.objects.all()
    return render(request, "store/Company/workers.html", {"workers": workers})

def vacancies(request):
    logger.info("Fetching vacancies list")
    vacancies = Vacancy.objects.all()
    return render(request, "store/Company/vacancies.html", {"vacancies": vacancies})

def privacy(request):
    logger.info("Rendering privacy page")
    return render(request, "store/Company/privacy.html")

def faqs(request):
    logger.info("Fetching FAQs list")
    return render(request, "store/Company/faqs.html", {"faqs": list(FAQ.objects.all())})

def faqs_detail(request, id):
    logger.info(f"Fetching details for FAQ ID: {id}")
    faq = FAQ.objects.get(id=id)
    return render(request, "store/Company/faqs_detail.html", {"faq": faq})

def articles(request):
    logger.info("Fetching articles list")
    return render(request, "store/Company/articles.html", {"articles": list(Article.objects.all())})

def article_detail(request, id):
    logger.info(f"Fetching details for article ID: {id}")
    art = Article.objects.get(id=id)
    return render(request, "store/Company/article_detail.html", {"article": art})

def coupons_list(request):
    logger.info("Fetching coupons list")
    active = json.dumps(list(Coupon.objects.filter(active=True)), default=lambda o: o.__dict__)
    inactive = json.dumps(list(Coupon.objects.filter(active=False)), default=lambda o: o.__dict__)
    return render(request, "store/Company/coupons.html", {
        "active_coupons": Coupon.objects.filter(active=True),
        "disabled_coupons": Coupon.objects.filter(active=False),
        "active_js":active,
        "inactive_js": inactive
    })

def reviews_list(request):
    logger.info("Fetching reviews list")
    comments = Comment.objects.all()
    return render(request, "store/Company/review.html", {"comments": comments})

def review_create(request):
    if not request.user.is_authenticated:
        logger.warning("Unauthorized access attempt to review_create")
        return HttpResponseRedirect("/auth/login/")

    form = CommentForm()

    if request.method == "POST":
        comment = Comment.objects.create(
            date=date.today().strftime('%Y-%m-%d'),
            author=CustomUser.objects.get(id=request.user.id),
            mark=request.POST.get('mark'),
            text=request.POST.get('text')
        )
        comment.save()
        logger.info(f"Review created by user {request.user}")
    else:
        return render(request, "store/Review/create.html", {"form": form})

    return HttpResponseRedirect("/reviews/")


def user_profile(request, username):
    # Получаем пользователя по username
    user = get_object_or_404(CustomUser, username=username)
    
    return render(request, 'store/Profile/user_profile.html', {'user_profile': user})


def profile_edit(request, username):
    user = get_object_or_404(CustomUser, username=username)
    
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()
            return redirect('store:user_profile', username=user.username)
    else:
        form = UserProfileForm(instance=user)
    
    return render(request, 'store/Profile/profile_edit.html', {'form': form})


def charts(request):
    context = {
        'x': 1.5,   # Значение x, например, |x| > 1
        'eps': 0.0001  # Уровень точности
    }
    return render(request, 'store/Company/charts.html', context)


# Функция для отображения HTML-страницы с таблицей сотрудников
def contacts_page(request):
    return render(request, "store/Company/contacts_table.html")


@require_http_methods(["GET"])
def api_get_contacts(request):
    contacts = Contact.objects.all()
    data = [
        {
            "id": contact.id,
            "full_name": contact.full_name,
            "photo_url": contact.photo_url,
            "job_description": contact.job_description,
            "phone": contact.phone,
            "email": contact.email,
        }
        for contact in contacts
    ]
    return JsonResponse({"contacts": data})

@csrf_exempt
@require_http_methods(["POST"])
def api_add_contact(request):
    data = json.loads(request.body) # Чтение данных из тела запроса
    form = ContactForm(data) # Применение формы для валидации данных
    if form.is_valid():
        contact = form.save()
        response_data = {
            "id": contact.id,
            "full_name": contact.full_name,
            "photo_url": contact.photo_url,
            "job_description": contact.job_description,
            "phone": contact.phone,
            "email": contact.email,
        }
        return JsonResponse({"contact": response_data}, status=201)
    return JsonResponse({"errors": form.errors}, status=400)