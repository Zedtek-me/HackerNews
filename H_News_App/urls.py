from django.urls import path
from . import views, api_view
urlpatterns= [
    path('', views.index, name='index-page'),
    path('filter',views.filter, name='search'),
    path('search',views.search, name='search'),
    # api url below
    path('api', api_view.handle_api_request, name='api view' ),
]