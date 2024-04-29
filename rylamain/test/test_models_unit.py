import pytest
from rylamain.models import *
from django.test import TestCase
from mixer.backend.django import mixer
from django.contrib.auth.hashers import make_password
from decouple import config
class TestModels(TestCase):
    def setUp(self):
        password = make_password(config('url_password'))
        self.user =mixer.blend(USERS_AVAILABLE,name='harold',password=password) #USERS_AVAILABLE.objects.create(name='harold',password='piTsBurg212*',email='jimmy21@gmail.com',is_staff=False,admin=False)
        
        
    def test_user(self):
        assert(isinstance(self.user,USERS_AVAILABLE))
        self.assertEqual(self.user.name,'harold')