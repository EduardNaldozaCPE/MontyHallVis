import json
from django.shortcuts import render
from django.http import HttpResponse
from .montymain import MontyHall_single as MH
from .models import Stats
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import datetime

# Create your views here.


@api_view(['GET', 'POST'])
def scoreAPI(request, *args, **kwargs):
    def returnData():
        get_stats_dict = Stats.objects.filter(
            mode=kwargs['mode'])[0].__dict__
        data = {
            'meta': {
                'datetime': datetime.datetime.now(),
                'user':     str(request.user),
            },
            'data': get_stats_dict
        }
        return data
    if kwargs['mode'] == 0 or kwargs['mode'] == 1 or kwargs['mode'] == 2:
        if request.method == 'GET':
            # Return data as json response
            finalData = returnData()
            return HttpResponse(json.dumps(finalData, indent=4, sort_keys=True, default=str), content_type="application/json")

        elif request.method == 'POST':
            row = request.POST['mode']
            act = request.POST['act']
            pasw = request.POST['pasw']
            if pasw == 'tryme':
                if act == 'clear':
                    g = Stats.objects.filter(mode=row)[0]
                    g.correctCount = 0
                    g.wrongCount = 0
                    g.winrate = 0
                    g.icount = 0
                    g.save()
                elif act == 'iter':
                    # Run the Monty Hall simulation and store in 'result'
                    result = MH(mode=kwargs['mode'])['isWin']
                    # Create a query that retrieves the data
                    get_stats = Stats.objects.filter(mode=kwargs['mode'])[0]
                    # Update the retrieved data accordingly
                    if result:
                        get_stats.correctCount += 1
                    else:
                        get_stats.wrongCount += 1

                    cc = get_stats.correctCount
                    wc = get_stats.wrongCount

                    ic = get_stats.icount
                    get_stats.icount += 1
                    ic += 1

                    if ic != 0:
                        get_stats.winrate = round((cc / ic), 2)
                    # Save the updated data to the database
                    get_stats.save()
                # return HttpResponse(json.dumps(returnData(), indent=4, sort_keys=True, default=str), content_type="application/json")
                return Response(json.dumps(returnData(), indent=4, sort_keys=True, default=str), status=status.HTTP_201_CREATED)
            else:
                HttpResponse(json.dumps(returnData(), indent=4, sort_keys=True,
                             default=str), content_type="application/json")

    else:
        return HttpResponse(json.dumps({
            "data": {},
            "meta": {
                'datetime': datetime.datetime.now(),
                'user':     str(request.user),
            }
        }, indent=4, sort_keys=True, default=str), content_type="application/json")
