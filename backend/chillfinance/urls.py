from django.contrib.auth.views import LoginView
from django.urls import path, include
from rest_framework import routers
from .views import *
from chillfinance.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'banks', BankViewSet)
router.register(r'entertainment', EntertainmentViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'bankaccounts', BankAccountViewSet)
router.register(r'balance', BalanceViewSet)
urlpatterns = [
path('api/signin/', LoginAPIView.as_view(), name='signin'),
path('api/signup/', RegistrationAPIView.as_view(), name='signup'),
path('api/logout/', LogoutAPIView.as_view(), name='logout'),
    path('', home),
    path('api/token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
]
