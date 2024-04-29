from django.shortcuts import render
from django.http import HttpResponse
from .serializer import *
# Create your views here.
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .serializer import *
from rest_framework.permissions import AllowAny
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import hashers


class REGISTER_USER(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        try:
            data = request.data
            user_available = USERS_AVAILABLE.objects.filter(email = data['email']).last()
            
            if user_available:
                return Response('Email already Exists',status.HTTP_406_NOT_ACCEPTABLE)
            
            password = hashers.make_password(data['password'])
            user = USERS_AVAILABLE.objects.create(name=data['name'],password=password,email=str(data['email']).lower().strip(),is_staff=False,admin=False)
            user_serializer = USER_SERIALIZER(user)

            return Response(user_serializer.data,status.HTTP_201_CREATED)
        
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id):
        try:
            new_data = request.data
            data = new_data.copy()
            
            try:
                user_available = USERS_AVAILABLE.objects.get(id = id)
            except Exception as e:
                return Response('An error occurred',status.HTTP_404_NOT_FOUND)
            
            if 'password' in data:
                password = hashers.make_password(data['password'])
                data['password']=password
                
            if 'email' in data:
                email = str(data['email']).lower().strip()
                data['email']=email
                
            user_serializer = USER_SERIALIZER(user_available,data=data,partial=True)
            user_serializer.is_valid()
            user_serializer.save()
            return Response(user_serializer.data,status.HTTP_202_ACCEPTED)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        
        
class RefreshTokenView(TokenRefreshView):
    permission_classes=[AllowAny]
    serializer_class=MyrefreshTokenSerializer


class MyLoginView(TokenObtainPairView):
    permission_classes=[AllowAny]
    serializer_class = MyCustomTokenSerializer
    
def index(request):
    return HttpResponse('index a')