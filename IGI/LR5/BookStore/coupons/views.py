from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_POST
from django.shortcuts import render, redirect
from coupons.forms import CouponApplyForm
from coupons.models import Coupon

# Create your views here.

@require_POST
def coupon_apply(request):
    form = CouponApplyForm(request.POST)
    if form.is_valid():
        code = form.cleaned_data['code']
        try:
            coupon = Coupon.objects.get(code__iexact=code,
                                        active=True)
            
            request.session['coupon_id'] = coupon.id
        #except ObjectDoesNotExist:
        #    request.session['coupon_id'] = request.session['coupon_id']
        except Coupon.DoesNotExist:
            request.session['coupon_id'] = None
    return redirect('cart:cart_detail')