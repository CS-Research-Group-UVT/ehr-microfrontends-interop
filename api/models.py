from django.db import models
from django.db.models import Model


# Create your models here.

class Widget(Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    downloads = models.IntegerField(default=0)
    publishDate = models.DateTimeField(auto_now_add=True)
    version = models.CharField(max_length=20, default='1.0.0')

    def __str__(self):
        return self.name + " v" + self.version