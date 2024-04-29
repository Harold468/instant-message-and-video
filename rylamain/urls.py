from django.contrib import admin
from django.urls import path
from .views import *
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', MyLoginView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('api/signup/',REGISTER_USER.as_view(),name='signup'),
    path('api/update/<str:id>/',REGISTER_USER.as_view(),name='update'),
    path('', index,name='index'),
    
]
