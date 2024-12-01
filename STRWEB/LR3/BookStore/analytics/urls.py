from django.urls import path
from analytics import views

app_name = 'analytics'

urlpatterns = [

path('statistic/', views.statistic_view , name = "statistic"),
path('order_graph/', views.order_graph_view , name = "order_graph"),

]