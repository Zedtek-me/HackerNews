from django.shortcuts import render
from django.http import HttpResponse
from .models import News
import json
# from .cron import story_url, show_url, ask_url,job_url
# home page.
def index(request):
    news= News.objects.all()
    context= {'data' :news}
    # print([story_url, show_url, ask_url,job_url])
    return render(request, 'index.html', context)

#  Handle fileter function: I 
def filter(request):
    jsonified_data=None
    filter_by = json.loads(request.body)
    # filter by the 'job news'
    if 'job' in filter_by:
        job_news= News.objects.filter(type='job')
        jsonified_data=job_news
    
    # filter by general news
    else:
        generalStory_news= News.objects.filter(type='story')
        jsonified_data=generalStory_news
    return HttpResponse(jsonified_data)

# search function
def search(request):
    search_item= json.loads(request.body)
    print(search_item)
    return HttpResponse('')



