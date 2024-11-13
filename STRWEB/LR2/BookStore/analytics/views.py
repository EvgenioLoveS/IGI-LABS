from django.core.exceptions import PermissionDenied
from django.db.models import Avg, Count, Sum
from statistics import median, mode
from collections import defaultdict
from django.conf import settings
from django.shortcuts import render
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
from order.models import *
from store.models import *
import os
from django.db.models import F


# Create your views here.

def calculate_statistics():
    # List of clients in alphabetical order
    clients = Client.objects.order_by('last_name', 'first_name')

    # List of books in alphabetical order
    books = Book.objects.order_by('title')

    # Total sales amount
    total_sales = OrderItem.objects.aggregate(total_sales=Sum(F('price') * F('quantity')))


    # Sales data
    #sales_data = list(OrderItem.objects.values_list('price', flat=True))
    sales_data = list(OrderItem.objects.values_list('cost', flat=True))

    # Age data
    today = date.today()
    client_ages = [(today.year - client.date_of_birth.year - ((today.month, today.day) < (client.date_of_birth.month, client.date_of_birth.day))) for client in clients]

    # # Popular book type (Genre with most sales)
    # popular_genre = Book.objects.values('genre__name').annotate(total_sold=Count('order_items')).order_by('-total_sold').first()

    # # Least popular book type (Genre with least sales)
    # least_popular_genre = Book.objects.values('genre__name').annotate(total_sold=Count('order_items')).order_by('total_sold').first()

    # Популярный жанр (Жанр с наибольшим количеством продаж)
    popular_genre = Book.objects.values('genre__name').annotate(total_sold=Sum('order_items__quantity')).order_by('-total_sold').first()

    # Наименее популярный жанр (Жанр с наименьшим количеством продаж)
    least_popular_genre = Book.objects.values('genre__name').annotate(total_sold=Sum('order_items__quantity')).order_by('total_sold').first()


    # Most profitable book type (Genre with highest sales amount)
    profitable_genre = Book.objects.values('genre__name').annotate(total_revenue=Sum('order_items__price')).order_by('-total_revenue').first()

    # Statistical metrics for sales amount
    if sales_data:
        sales_average = sum(sales_data) / len(sales_data)
        sales_median = median(sales_data)
        sales_mode = mode(sales_data)
    else:
        sales_average = sales_median = sales_mode = 0

    # Statistical metrics for client ages
    if client_ages:
        age_average = sum(client_ages) / len(client_ages)
        age_median = median(client_ages)
    else:
        age_average = age_median = 0

    context = {
        'clients': clients,
        'books': books,
        'total_sales': total_sales['total_sales'],
        'sales_average': sales_average,
        'sales_median': sales_median,
        'sales_mode': sales_mode,
        'age_average': age_average,
        'age_median': age_median,
        'popular_genre': popular_genre,
        'least_popular_genre': least_popular_genre,
        'profitable_genre': profitable_genre,
    }

    return context


def statistic_view(request):
    context = calculate_statistics()
    return render(request, 'analytics/statistic.html', context)


def order_graph_view(request):
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")

    pt = defaultdict(int)

    # Подсчет количества заказов по датам
    for order in Order.objects.all():
        date_str = order.created.strftime('%Y-%m-%d')
        pt[date_str] += 1

    # Сортировка дат
    sorted_dates = sorted(pt.keys())
    x = sorted_dates
    y = [pt[date] for date in sorted_dates]

    # Построение графика
    plt.figure(figsize=(10, 5))
    plt.plot(x, y, marker='o', linestyle='-', color='b')
    plt.xlabel('Date')
    plt.ylabel('Number of Orders')
    plt.title('Orders Over Time')
    plt.grid(True)
    plt.xticks(rotation=45)

    if request.method == "GET":
        file_path = os.path.join(settings.MEDIA_ROOT, 'order_graph.jpg')
        plt.savefig(file_path, format='jpg')
        plt.close()
        
        return render(request, 'analytics/order_graph.html', {'graph_url': settings.MEDIA_URL + 'order_graph.jpg'})

