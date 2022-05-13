from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import News
from .serializers import NewsSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def handle_api_request(request):
    '''
    handles incoming api requests
    '''
    if request.method == 'GET':
        news= News.objects.all()
        newsSerializer= NewsSerializer(news, many= True)
        return Response(newsSerializer.data)
    elif request.method == 'POST':
        posted_data= NewsSerializer(data= request.POST)
        if posted_data.is_valid():
            posted_data.save()
            return Response(data=posted_data)
        return Response('invalid input.', status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        pass
    else:
        pass
