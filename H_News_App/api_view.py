from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import News
from .serializers import NewsSerializer


@api_view(['GET', 'POST'])
def handle_api_request(request):
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
            return Response({"message": "your item was created. You can refresh now."}, status=status.HTTP_200_OK)
    else:
        return Response(data={"invalid":"invalid request at this endpoint"}, status=status.HTTP_400_BAD_REQUEST)
    


# @api_view(['DELETE'])
# def handle_api_request(request):
#     '''
#     handles incoming delete requests
#     '''
#     if request.method == 'POST':
#         serializer= NewsSerializer(request.data)
#         if serializer.is_valid(): 
#             return Response({"message": "your item was created"}, status=status.HTTP_200_OK)
#     return Response(data={"invalid":"invalid request at this endpoint"}, status=status.HTTP_400_BAD_REQUEST)