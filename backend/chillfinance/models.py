from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager


class Role(models.Model):
    title = models.CharField(max_length=100, verbose_name = 'Роль', default=None,null=False)
    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название категории', unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class CustomUser(AbstractUser):
    username = models.CharField(verbose_name='Имя пользователя', max_length=150,null=False, unique=True)
    email = models.EmailField(unique=True,null=True,default=None,blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    name = models.CharField(verbose_name='Имя', max_length=150,null=True,default=None, blank=True)
    surname = models.CharField(verbose_name='Фамилия', max_length=150 ,null=True,default=None, blank=True)

    role = models.ForeignKey(Role, on_delete=models.PROTECT,null=True,default = None, blank = True, verbose_name='Роль')
    photo = models.ImageField(verbose_name='Фото', upload_to='worker_images', null=True, blank=True)
    objects = CustomUserManager()
    categories = models.ManyToManyField(Category, help_text="Категории пользователя",null=True, blank=True)
    USERNAME_FIELD = "username"

    def has_perm(self, perm, obj=None):
        return self.is_superuser
    def has_module_perms(self, app_label):
        return self.is_superuser
    def get_privs(self):
        return []
    def get_name(self):
        return f'{self.name} {self.surname}'
    class Meta:
        db_table = 'auth_user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    def __str__(self):
        return f'{self.username}'



class Bank(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField()  # URL для получения баланса
    def __str__(self):
        return self.name

class BankAccount(models.Model):
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='user_accounts')
    is_auth = models.BooleanField(default=False)  # Флаг авторизации пользователя в данном банке
    account_number = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.bank.name}"

class Balance(models.Model):
    user_bank_account = models.OneToOneField(BankAccount, on_delete=models.CASCADE, related_name='balance', default=None, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.user_bank_account.user.username}"




class Entertainment(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название развлечения')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='entertainments', verbose_name='Категории')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Развлечение'
        verbose_name_plural = 'Развлечения'
