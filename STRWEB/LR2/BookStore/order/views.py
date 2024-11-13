from django.shortcuts import render
from .models import OrderItem, Order
from cart.cart import Cart
from store.models import Client
from login.models import CustomUser
from django.core.exceptions import PermissionDenied
from .forms import OrderCreateForm

# Create your views here.


def order_create(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("net dostpa")

    cart = Cart(request)
    if request.method == 'POST': 
        print(request.user.email)      
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = Order.objects.create(client = CustomUser.objects.filter(email=request.user.email).first())
            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = cart.coupon.discount
            
            for item in cart:
                OrderItem.objects.create(order=order,
                                            book=item['book'],
                                            price=item['price'],
                                            quantity=item['quantity'],
                                            cost=item['price']*item['quantity'])
                item['book'].purchase_count += item['quantity']
                item['book'].save()
            # очистка корзины
            cart.clear()
            order.get_total_cost()
            order.save()
            #del request.session['coupon_id']
            request.session.pop('coupon_id', None)
            return render(request, 'order/created.html',
                            {'order': order})
    
    return render(request, 'order/create.html',
                  {'cart': cart})


def order_list(request):
    if not request.user.is_staff:
        raise PermissionDenied("У вас нет доступа к этой странице.")

    orders = Order.objects.all()

    return render(request, 'order/orders.html', {'orders': orders})


def user_orders(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("У вас нет доступа к этой странице.")
    
    orders = Order.objects.filter(client=request.user)
    
    return render(request, 'order/user_orders.html', {'orders': orders})