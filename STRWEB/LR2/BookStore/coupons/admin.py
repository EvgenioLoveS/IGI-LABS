from django.contrib import admin
from coupons.models import Coupon
# Register your models here.

class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount', 'active']
    list_filter = ['active']
    search_fields = ['code']
admin.site.register(Coupon, CouponAdmin)