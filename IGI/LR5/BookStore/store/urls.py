from django.urls import path, re_path
from store import views

app_name = 'store'

urlpatterns = [
    
     # Root URL
    path('', views.home),

    # Company related views
    path('home/', views.home),
    path('about/', views.about_company),
    path('workers/', views.workers_list),
    path('vacancies/', views.vacancies),
    path('privacy/', views.privacy),
    path('faqs/', views.faqs),
    #path('faqs/<int:id>/', views.faqs_detail),
    re_path(r'^faqs/(?P<id>\d+)/$', views.faqs_detail),
    path('articles/', views.articles),
    #path('articles/<int:id>/', views.article_detail),
    re_path(r'^articles/(?P<id>\d+)/$', views.article_detail),
    path('coupons/', views.coupons_list),


    # Review related views
    path('reviews/', views.reviews_list, name='reviews_list'),
    path('reviews/create/', views.review_create),


     # Book related views
    path('books/', views.book_list, name='book_list'),
    path("books/create/", views.book_create, name='book_create'),
    #path("edit/<int:id>/", views.book_edit),
    re_path(r'^books/edit/(?P<id>\d+)/$', views.book_edit, name='book_edit'),
    #path("delete/<int:id>/", views.book_delete),
    re_path(r'^books/delete/(?P<id>\d+)/$', views.book_delete, name='book_delete'),
    #path('books/<int:id>', views.book_detail, name='book_detail'),
    re_path(r'^books/(?P<id>\d+)/$', views.book_detail, name='book_detail'),
    #path('<str:book_genre_name>/', views.book_list, name='book_list_by_genre'), 
    re_path(r'^books/(?P<book_genre_name>[\w-]+)/$', views.book_list, name='book_list_by_genre'),  

    #User related views
    path('user/<str:username>/', views.user_profile, name='user_profile'),
    path('user/<str:username>/edit/', views.profile_edit, name='profile_edit'),
]