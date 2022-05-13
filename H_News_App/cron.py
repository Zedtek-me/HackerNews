import requests, random
from .models import News
import json

class NewsItems:

    def __init__(self, news_type_url:str) -> requests.models.Response:
        self.url= news_type_url

    def get_latest_news(self):
        '''
        get the latest 100 news items from hackernews;
        store them in the database.
        '''
        # getting all items, from the url below, as stipulated in the api doc.
        item_max_id= requests.get('%s'%self.url).json()
        # as stated in the api doc, the latest items start from the max downward. So, get the latets 100 news as directed.
        item_max_id.reverse()
        items_from_latest= item_max_id[:100]
        print(len(items_from_latest))
        print(items_from_latest)
        # loop through each news item to get their properties, and store in the database, as directed.
        for item in items_from_latest:
            print(item)
            news= requests.get(f'https://hacker-news.firebaseio.com/v0/item/{item}.json?print=pretty').json()
            print(news)
            try:
                db_news= News.objects.update_or_create(**news)
                print(f"{news.get('by')}, was saved in the db")
            except Exception as err:
                raise(err)
        print('all items saved up')

top_stories= NewsItems('https://hacker-news.firebaseio.com/v0/topstories.json')
ask_stories= NewsItems('https://hacker-news.firebaseio.com/v0/askstories.json')
show_stories= NewsItems('https://hacker-news.firebaseio.com/v0/showstories.json')
job_stories= NewsItems('https://hacker-news.firebaseio.com/v0/jobstories.json')
story_url= top_stories.get_latest_news()
ask_url= ask_stories.get_latest_news()
show_url=show_stories.get_latest_news()
job_url=job_stories.get_latest_news()
