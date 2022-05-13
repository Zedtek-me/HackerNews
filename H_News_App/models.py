from django.db import models
from django.contrib.postgres.fields import ArrayField
# the News table
class News(models.Model):
    id= models.IntegerField(unique=True, primary_key=True)
    type= models.CharField('news type', max_length=100, blank= False, default='unknown type')
    text= models.TextField('comments on news', max_length=30000000000000000000000000000000000000000000000000)
    title= models.CharField(max_length=30000,blank= True)
    time= models.DateTimeField(auto_now_add=False)
    by= models.CharField(max_length=200, unique= False)
    deleted= models.BooleanField(default=False, blank=True)
    kids= ArrayField(models.IntegerField(null=True, blank=True), null=True, blank=True)
    parent= models.IntegerField(null=True)
    dead= models.BooleanField(default=False)
    score= models.IntegerField(null=True)
    parts= models.IntegerField(null=True)
    descendants=models.IntegerField(null=True)
    url=models.TextField(max_length=3000000000000000,blank=True, null=True, unique=False)

    def __str__(self) -> str:
        return self.text

    def __repr__(self):
        return self.type
