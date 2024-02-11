from django.urls import path

# from backend.api.serializers import SendPasswordResetEmailSerializer

from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="products"),


]

