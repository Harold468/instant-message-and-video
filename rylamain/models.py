from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
# Create your models here.

class USERMANAGER(BaseUserManager):
    def create_user(self,name,password,**extra_fields):
        email = extra_fields.get("email")
        if not name:
            return ValueError("name not found")
        if not email:
            return ValueError("email not found")
        
        user = self.model(name=name,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
    def create_superuser(self,name,password,**extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("admin",True)
        
        email = extra_fields.get("email")
        
        if not email:
            return ValueError("email not found")
        
        self.create_user(name,password,**extra_fields)

class USERS_AVAILABLE(AbstractBaseUser,PermissionsMixin):
    
    class Meta:
        verbose_name = 'USER'
        verbose_name_plural = 'USERS AVAILABLE'
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=True)
    admin = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    REQUIRED_FIELDS=["name"]
    USERNAME_FIELD='email'
    
    objects = USERMANAGER()
    
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True