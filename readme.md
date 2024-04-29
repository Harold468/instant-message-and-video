# 1. Instant Messaging and Videocall Using Django,Redis & React

# 1.1 Django components

    - Channels
    - AsyncWebsocket
    - rest_framework
    - mixer
    - pytest
    - code coverage
    - postgresql
    - redis
    - whitenoise
    - cors-headers

# 1.2 React components

    - tailwind css
    - vanilla js Websocket()
    - axios
    - framer-motion
    - react-router-dom

# 2. Code Structure for django

## 2.0.1 ASGI components

    - hypercorn
        - hypercorn project_name.asgi:application

## 2.1 Redis setup with django in django project settings 
```python

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)],
        },
    },
}
```

## 2.2 Installed apps
```python 

INSTALLED_APPS = [
    "channels",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rylamain',
    'rest_framework',
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
]

```

## 2.3 Security setup with simple-jwt

```python
# in serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
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
# in view
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView

class RefreshTokenView(TokenRefreshView):
    permission_classes=[AllowAny]
    serializer_class=MyrefreshTokenSerializer


class MyLoginView(TokenObtainPairView):
    permission_classes=[AllowAny]
    serializer_class = MyCustomTokenSerializer

# in settings
REST_FRAMEWORK = { 
    'DEFAULT_SCHEMA_CLASS': 
        'rest_framework.schemas.coreapi.AutoSchema', 
    'DEFAULT_PERMISSION_CLASSES': 
        ('rest_framework.permissions.IsAuthenticated',),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
  }

```

# 3. Channel Connection

## 3.1 Set asgi application in settings
```python 
ASGI_APPLICATION = 'ryla.asgi.application'
```

## 3.2 ASGI configuration 
```python 
import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from rylamain.routing import websocket_patterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ryla.settings')

application = ProtocolTypeRouter({
    "http":get_asgi_application(),
    "websocket":AuthMiddlewareStack(URLRouter(websocket_patterns))
})

```

## 3.3 Websockets for group chat and individual chat (Consumers)

### 3.3.1 Group chat
```python
class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'chat_group_name'
        await self.channel_layer.group_add(self.room_name,self.channel_name)
        
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type":"confirm_user",
                "username":self.scope["url_route"]["kwargs"]["id"]
            }
        )
        await self.accept()
        
    async def confirm_user(self,event):
        await self.send(text_data=json.dumps({
            "username":event["username"]
        }))
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name,self.channel_name)
        
    async def receive(self,text_data):
        data = json.loads(text_data)
        
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type":"send_group",
                "message":data["message"],
                "username":data["username"]
            }
        )
        
    async def send_group(self,event):
        message = event["message"]
        username = event["username"]
        
        await self.send(text_data=json.dumps({
            "message":message,
                "username":username
        }))
```

### 3.3.1 Peer to Peer Chat
```python 
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = f'chat_{self.scope["url_route"]["kwargs"]["room_name"]}'
        
        user_one = str(self.scope["url_route"]["kwargs"]["room_name"]).split('-')[0]
        user_two = str(self.scope["url_route"]["kwargs"]["room_name"]).split('-')[1]
        
        await self.channel_layer.group_add(self.room_name,self.channel_name)
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name,self.channel_name)
        
    async def receive(self, text_data):
        data = json.loads(text_data)
        
        await self.channel_layer.group_send(
            self.room_name,
            {
            "type":"send_message",
            "message":data["message"],
            "username":data["username"]
        })
        
    async def send_message(self,event):
        message=event["message"]
        username=event["username"]
        await self.send(text_data=json.dumps({
             "message":message,
            "username":username
        }))
```
### 3.3.2 Urls for consumers (routing)
```python 
from .consumers import *
from django.urls import re_path,path
websocket_patterns=[
    # re_path(r"^ws/",ChatConsumer.as_asgi()),
    path("ws/<str:room_name>/",ChatConsumer.as_asgi()),
    path("ws/group/user/<str:id>/",GroupChatConsumer.as_asgi()),
    
]
```

# 4. React Application

    - react-router-dom
    - axios
    - Websocket
    - react-framer-motion
    