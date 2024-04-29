from .consumers import *
from django.urls import re_path,path
websocket_patterns=[
    # re_path(r"^ws/",ChatConsumer.as_asgi()),
    path("ws/<str:room_name>/",ChatConsumer.as_asgi()),
    path("ws/group/user/<str:id>/",GroupChatConsumer.as_asgi()),
    
]