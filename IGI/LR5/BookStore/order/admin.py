from django.contrib import admin

from order.models import Order, OrderItem

# Register your models here.


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['book']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'client',
                    'created', 'total_cost']
    

    list_filter = ['created']
    inlines = [OrderItemInline]

admin.site.register(Order, OrderAdmin)