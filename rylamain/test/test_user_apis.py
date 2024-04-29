import pytest
from rylamain.models import *
from django.test import TestCase
from mixer.backend.django import mixer
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.hashers import make_password
from decouple import config

class TestModels(TestCase):
    def setUp(self):
        self.client=APIClient()
    
    def test_register_user(self):
        
        password = make_password(config('url_password'))
        data={
            "name":"harold",
            "password":password,
            "email":"haroldosei24@gmail.com"
        }
        url = reverse('signup')
        response = self.client.post(url,data=data)
        assert(response.status_code==201)