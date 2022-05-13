from django.urls import path
from . import views, api_view
urlpatterns= [
    path('', views.index, name='index-page'),
    path('filter',views.filter, name='search'),
    path('search',views.search, name='search'),
    # api url below
    path('api', api_view.handle_get_and_post, name='getview' ),
    path('api/<int:id>', api_view.handle_update_and_delete, name='update view' ),
]