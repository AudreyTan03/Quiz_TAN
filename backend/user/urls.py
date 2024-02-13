from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from . import views
from user.views import SendPasswordResetEmailView, UserPasswordResetView, registerUser, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('users/login/', views.loginUser, name='login'),  # Use TokenObtainPairView from rest_framework_simplejwt
    path('users/profile/', UserProfileView.as_view(), name='users-profile'),
    path('users/', UserProfileView.as_view(), name='users-profiles'),
    path('users/register/', views.registerUser, name='register'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
]
