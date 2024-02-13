from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from . import views
from user.views import SendPasswordResetEmailView, UserPasswordResetView, registerUser, UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use TokenObtainPairView from rest_framework_simplejwt
    path('users/profile/', UserProfileView.as_view(), name='users-profile'),
    path('users/', UserProfileView.as_view(), name='users-profiles'),
    path('users/register/', views.registerUser, name='register'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
]
