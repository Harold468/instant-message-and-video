from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json

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