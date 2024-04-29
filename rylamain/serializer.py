from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from .models import *
from rest_framework import serializers

class USER_SERIALIZER(serializers.ModelSerializer):
    class Meta:
        model=USERS_AVAILABLE
        fields=('name','email','is_staff','admin','created_at')
        
class MyrefreshTokenSerializer(TokenRefreshSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        return data
    
class MyCustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        token = self.get_token(self.user)
        data['user']  = {
            "id":self.user.id,
            "name":self.user.name,
            "email":self.user.email,
            "is_staff":self.user.is_staff,
            "admin":self.user.admin,
            "last_login":self.user.last_login,
            "joined-at":self.user.created_at
        }
        
        return data