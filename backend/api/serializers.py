from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields ='__all__'


