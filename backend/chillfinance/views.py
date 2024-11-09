from django.conf import settings
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import AllowAny
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import CustomUserSerializer, UserListSerializer, GetTokenSerializer


def home(request):
    users = CustomUser.objects.all()
    return render(request,'chillfinance/home.html',{'users':users})


class RegistrationAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        user = CustomUser.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password'])
        user.save()
        response = Response()
        refresh = RefreshToken.for_user(user) # Создание Refesh и Access
        refresh.payload.update({    # Полезная информация в самом токене
                'user_id': user.id,
                'username': user.username,
                'email': user.email
        })
        response.set_cookie(
            key=settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME'],
            value=str(refresh),
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        )
        response.data = {
            'access_token': str(refresh.access_token),

        }
        response.status = status.HTTP_200_OK
        return response

class LoginAPIView(APIView):
    permission_classes = []
    serializer_class = GetTokenSerializer
    def post(self, request):

        data = request.data
        response = Response()
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        if username is None or password is None:

            return Response({'error': 'Нужно имя пользователя  и пароль'},

                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username,password=password)
      
        if user is None:

            return Response({'error': 'Неверные данные'},

                            status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        response.set_cookie(
            key=settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME'],
            value=str(refresh),
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        )
        print(response.cookies)
        refresh.payload.update({
            'user_id': user.id,
            'username': user.username,
            'email': user.email

        })
        response.data = {
            'access_token': str(refresh.access_token),

        }
        response.status = status.HTTP_200_OK
        return response

class LogoutAPIView(APIView):
    permission_classes = []
    def post(self, request):
        try:
            try:
                refresh = RefreshToken(request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME']))
                refresh.blacklist()
                logout(request)
            except KeyError:
                return Response(
                    {"error": "Provide refresh_token in data"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            response = Response({'message': 'Logged out and blacklisted token'}, status=status.HTTP_200_OK)
            response.delete_cookie('refresh_token')

            return response
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RefreshTokenView(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request, format=None):
        response = Response()
        print(request.COOKIES)
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME'])
        
        if refresh_token is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken(refresh_token)
        data = {"access_token": str(refresh.access_token)}

        # if api_settings.ROTATE_REFRESH_TOKENS:
        #     if api_settings.BLACKLIST_AFTER_ROTATION:
        # try:
        #     # Attempt to blacklist the given refresh token
        #     refresh.blacklist()
        # except AttributeError:
        #     # If blacklist app not installed, `blacklist` method will
        #     # not be present
        #     pass

        refresh.set_jti()
        refresh.set_exp()
        refresh.set_iat()

        data["refresh"] = str(refresh)
        response.set_cookie(
            key=settings.SIMPLE_JWT['REFRESH_TOKEN_COOKIE_NAME'],
            value=data["refresh"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        response.data = {
            'access_token': str(refresh.access_token),

        }
        response.status = status.HTTP_200_OK
        return response




class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserListSerializer
