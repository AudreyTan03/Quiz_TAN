from imaplib import _Authenticator
from rest_framework import serializers
from user.utils import Util
from user.models import User
from django.contrib.auth import authenticate
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UserRegistrationSerializers(serializers.ModelSerializer):
    # Additional fields for user type
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
    )
    user_type = serializers.ChoiceField(choices=USER_TYPE_CHOICES)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'user_type']
        extra_kwargs={
            'password': {'write_only': True}
        }

    # Validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = self.context['request'].data.get('password2')  # Get password2 from request data
        user_type = attrs.get('user_type')

        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password don't match")

        # Check if user type is valid
        if user_type not in dict(self.USER_TYPE_CHOICES).keys():
            raise serializers.ValidationError("Invalid user type")

        return attrs 
    
    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        password = validated_data.pop('password')
        is_instructor = user_type == 'instructor'
        user = User.objects.create_user(**validated_data, password=password)
        user.user_type = user_type
        user.is_instructor = is_instructor
        user.is_student = not is_instructor  # explicit save nalang tangina
        user.save()
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)
    # user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES, read_only=True)  # Kukunin lang

    class Meta:
        model = User
        fields = ['email', 'password']  # Include user_type in the serializer fields

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        # print(email, password)

        
        user = authenticate(email=email, password=password)
        # print(user)
        if user:
                return attrs
        else:
            raise serializers.ValidationError("Invalid credentials")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email = email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            print('Encoded UID', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token', token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Password Reset Link', link)
            # Send EMail
            Util.send_email({'to_email': email, 'email_subject': 'Password Reset', 'email_body': link})
            return attrs
        else:
            raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not Valid or Expired')
                    
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("Token is not Valid or Expired")

