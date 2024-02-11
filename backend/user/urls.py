from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from user.views import SendPasswordResetEmailView, UserPasswordResetView, UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use TokenObtainPairView from rest_framework_simplejwt
    path('users/profile/', UserProfileView.as_view(), name='users-profile'),
    path('users/', UserProfileView.as_view(), name='users-profiles'),
    path('users/register/', UserRegistrationView.as_view(), name='register'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
]
