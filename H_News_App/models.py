from django.db import models
from django.forms import CharField
from django.core.validators import int_list_validator
# the News table
class News(models.Model):
    id= models.IntegerField(unique=True, primary_key=True, default=models.AutoField)
    type= models.CharField('news type', max_length=100, blank= False, default='unknown type')
    text= models.TextField('comments on news', max_length=30000000000000000000000000000000000000000000000000)
    title= models.CharField(max_length=30000,blank= True)
    time= models.IntegerField(blank=True, null= True)
    by= models.CharField(max_length=200, unique= False)
    deleted= models.BooleanField(default=False)
    kids= models.CharField(validators=[int_list_validator], max_length=30000000000000000000000000000000000000000000000000, blank=True, null=True)
    parent= models.IntegerField(null=True, blank=True)
    dead= models.BooleanField(default=False)
    score= models.IntegerField(null=True, blank=True)
    parts= models.IntegerField(null=True, blank=True)
    descendants=models.IntegerField(null=True, blank=True)
    url=models.URLField(max_length=3000000000000000,blank=True, null=True, unique=False)

    def __str__(self) -> str:
        return self.text

    def __repr__(self):
        return self.type
