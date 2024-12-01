from . import views
from django.urls import path

app_name = 'order'

urlpatterns = [
    path('create/', views.order_create, name='order_create'),
    path('order_list/', views.order_list, name='order_list'),
    path('my_orders/', views.user_orders, name='user_orders'), 
]