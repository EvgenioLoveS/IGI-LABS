from django.test import TestCase, Client
from django.urls import reverse
from store.models import History, Article, WorkerPosition, Vacancy, FAQ, Comment
from login.models import CustomUser
from coupons.models import Coupon
from django.utils import timezone
import pytz
from datetime import date

class HomeViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.article = Article.objects.create(title="Test Article", content="Test Content")

    def test_home_view(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Article")
        self.assertIn("time", response.context)
        self.assertIn("user_timezone", response.context)

class AboutCompanyViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        History.objects.create(year=2021, description="Founded")
        History.objects.create(year=2022, description="Expanded")

    def test_about_company_view(self):
        response = self.client.get(reverse('about_company'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Founded")
        self.assertContains(response, "Expanded")
        self.assertIn("history", response.context)

class WorkersListViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        WorkerPosition.objects.create(name="Manager")
        WorkerPosition.objects.create(name="Developer")

    def test_workers_list_view(self):
        response = self.client.get(reverse('workers_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Manager")
        self.assertContains(response, "Developer")
        self.assertIn("workers", response.context)

class VacanciesViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        Vacancy.objects.create(title="Developer")
        Vacancy.objects.create(title="Designer")

    def test_vacancies_view(self):
        response = self.client.get(reverse('vacancies'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Developer")
        self.assertContains(response, "Designer")
        self.assertIn("vacancies", response.context)

class PrivacyViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_privacy_view(self):
        response = self.client.get(reverse('privacy'))
        self.assertEqual(response.status_code, 200)

class FaqsViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        FAQ.objects.create(question="Test Question 1", answer="Test Answer 1")
        FAQ.objects.create(question="Test Question 2", answer="Test Answer 2")

    def test_faqs_view(self):
        response = self.client.get(reverse('faqs'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Question 1")
        self.assertContains(response, "Test Question 2")
        self.assertIn("faqs", response.context)

class FaqsDetailViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.faq = FAQ.objects.create(question="Test Question", answer="Test Answer")

    def test_faqs_detail_view(self):
        response = self.client.get(reverse('faqs_detail', args=[self.faq.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Answer")
        self.assertIn("faq", response.context)

class ArticlesViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        Article.objects.create(title="Test Article 1", content="Test Content 1")
        Article.objects.create(title="Test Article 2", content="Test Content 2")

    def test_articles_view(self):
        response = self.client.get(reverse('articles'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Article 1")
        self.assertContains(response, "Test Article 2")
        self.assertIn("articles", response.context)

class ArticleDetailViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.article = Article.objects.create(title="Test Article", content="Test Content")

    def test_article_detail_view(self):
        response = self.client.get(reverse('article_detail', args=[self.article.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Content")
        self.assertIn("article", response.context)

class CouponsListViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        Coupon.objects.create(code="ACTIVE", active=True, discount=10)
        Coupon.objects.create(code="INACTIVE", active=False, discount=20)

    def test_coupons_list_view(self):
        response = self.client.get(reverse('coupons_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "ACTIVE")
        self.assertContains(response, "INACTIVE")
        self.assertIn("active_coupons", response.context)
        self.assertIn("disabled_coupons", response.context)

class ReviewsListViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        user = CustomUser.objects.create_user(username='user', password='password')
        Comment.objects.create(author=user, text="Great book!", mark=5)

    def test_reviews_list_view(self):
        response = self.client.get(reverse('reviews_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Great book!")
        self.assertIn("comments", response.context)

class ReviewCreateViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = CustomUser.objects.create_user(username='user', password='password')

    def test_review_create_view_get(self):
        self.client.login(username='user', password='password')
        response = self.client.get(reverse('review_create'))
        self.assertEqual(response.status_code, 200)
        self.assertIn("form", response.context)

    def test_review_create_view_post(self):
        self.client.login(username='user', password='password')
        response = self.client.post(reverse('review_create'), {
            'mark': 5,
            'text': 'Amazing book!'
        })
        self.assertEqual(response.status_code, 302)  # Redirect after creation
        self.assertTrue(Comment.objects.filter(text='Amazing book!').exists())

    def test_review_create_view_unauthorized(self):
        response = self.client.get(reverse('review_create'))
        self.assertEqual(response.status_code, 302)  # Redirect to login
