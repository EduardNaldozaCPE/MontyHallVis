import json
import re
from django.shortcuts import render
from django.http import HttpResponse
from .montymain import MontyHall_single as MH
from .models import Stats
import datetime

# Create your views here.


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

    if request.method == 'GET':
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
            get_stats.winrate = round((wc / ic), 2)
        # Save the updated data to the database
        get_stats.save()

        # Return data as json response
        finalData = returnData()
        return HttpResponse(json.dumps(finalData, indent=4, sort_keys=True, default=str), content_type="application/json")
    elif request.method == 'POST':
        row = request.POST['mode']
        pasw = request.POST['pasw']
        if pasw == 'tryme':
            g = Stats.objects.filter(mode=row)[0]
            g.correctCount = 0
            g.wrongCount = 0
            g.winrate = 0
            g.icount = 0
            g.save()
        finalData = returnData()
        return HttpResponse(json.dumps(finalData, indent=4, sort_keys=True, default=str), content_type="application/json")
