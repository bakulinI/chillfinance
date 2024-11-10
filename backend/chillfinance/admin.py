from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('title',)
@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username',)

@admin.register(Bank)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Entertainment)
class UserAdmin(admin.ModelAdmin):
    pass
@admin.register(BankAccount)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Balance)
class UserAdmin(admin.ModelAdmin):
    pass
@admin.register(Category)
class UserAdmin(admin.ModelAdmin):
    pass
