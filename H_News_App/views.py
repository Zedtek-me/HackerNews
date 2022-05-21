from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core import serializers
from .models import News
from django.db.models import Q
import json
# from .cron import story_url , show_url, ask_url,job_url
# home page.
def index(request):
    # print([story_url, show_url, ask_url,job_url])
    return render(request, 'index.html', context={})

#  Handle fileter function: I 
def filter(request):
    jsonified_data=None
    filter_by = json.loads(request.body)
    print(filter_by)
    # filter by the 'job news'
    if 'job' in filter_by:
        job_news= News.objects.filter(type='job')
        serialized_data= serializers.serialize('json',job_news)
        jsonified_data= serialized_data
    
    # filter by general news
    else:
        generalStory_news= News.objects.filter(type='story')
        serialized_data= serializers.serialize('json',generalStory_news)
        jsonified_data= serialized_data
    return HttpResponse(jsonified_data, content_type='application/json')
# search function
def search(request):
    search_query= json.loads(request.body)
    search_item= Q(text__icontains=search_query)
    print(search_item)
    return HttpResponse('')



