from django.http import JsonResponse
from django.forms.models import model_to_dict
# from .montymain import MontyHall_single as MH
from .models import Stats
from .serializers import StatsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


@api_view(['GET'])
def scoreAPI(request, *args, **kwargs):
    if request.method == 'GET':
        instance = Stats.objects.all()
        statsData = StatsSerializer(instance, many=True)
        return Response(statsData.data)


@api_view(['GET', 'PUT'])
def scoreDetail(request, *args, **kwargs):
    def returnData():
        instance = Stats.objects.filter(mode=kwargs['mode'])[0]
        statsData = StatsSerializer(instance).data
        return statsData

    try:
        stats = Stats.objects.get(mode=kwargs['mode'])
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        finalData = returnData()
        return Response(finalData)

    elif request.method == 'PUT':
        serializer = StatsSerializer(stats, data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Update other relevant data in Database
            statsModel = Stats.objects.filter(mode=kwargs['mode'])[0]
            cc = statsModel.correctCount
            wc = statsModel.wrongCount
            ic = cc+wc
            statsModel.icount = ic
            if ic != 0:
                wr = "%.2f" % (cc/statsModel.icount)
            else:
                wr = 0
            statsModel.winrate = wr
            statsModel.save()

            # Update other relevant data in Response
            rData = serializer.data
            rData['icount'] = ic
            rData['winrate'] = wr
            rData['winrate_percent'] = float(wr)*100
            return Response(rData)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pass
