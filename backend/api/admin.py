from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from account.models import EmailConfirmationToken

# class UserModelAdmin(BaseUserAdmin):
#   # The fields to be used in displaying the User model.
#   # These override the definitions on the base UserModelAdmin
#   # that reference specific fields on auth.User.
#   list_display = ('id', 'email', 'name', 'is_admin', 'is_active')
#   list_filter = ('is_admin',)
#   fieldsets = (
#       ('User Credentials', {'fields': ('email', 'password')}),
#       ('Personal info', {'fields': ('name', )}),
#       ('Permissions', {'fields': ('is_admin', 'is_active')}),
#   )
#   # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
#   # overrides get_fieldsets to use this attribute when creating a user.
#   add_fieldsets = (
#       (None, {
#           'classes': ('wide',),
#           'fields': ('email', 'name', 'password1', 'password2'),
#       }),
#   )
#   search_fields = ('email',)
#   ordering = ('email', 'id')
#   filter_horizontal = ()



# admin.site.register(User, UserModelAdmin)

