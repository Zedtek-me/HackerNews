from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import News
from .serializers import NewsSerializer
from django.http import JsonResponse
import json


@api_view(['GET', 'POST'])
def handle_get_and_post(request):
    '''
    handles incoming get and post requests
    '''
    if request.method == 'GET':
        news= News.objects.all()
        serializer= NewsSerializer(news, many= True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer= NewsSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(data={"message": "your item was created. You can refresh now."}, status=status.HTTP_200_OK)
        return Response({'invalid': 'The data you sent was incorrect or incomplete.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data={"invalid":"invalid request at this endpoint"}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['PUT','DELETE'])
def handle_update_and_delete(request, id):
    '''
    handles incoming update and delete requests
    '''
    if request.method == 'PUT':
        # check whether you could use the PUT attribute on the request object...
        data_for_update= News.objects.filter(id=id)
        serializer= NewsSerializer(data_for_update)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(data={"invalid":"invalid request at this endpoint"}, status=status.HTTP_400_BAD_REQUEST)

