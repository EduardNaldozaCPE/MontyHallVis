import json
from django.shortcuts import render
from django.http import HttpResponse
from .montymain import MontyHall
from .models import Stats
import datetime

# Create your views here.
def scoreAPI(request, *args, **kwargs):
    query_stats = Stats.objects.all()[0].__dict__

    data = {   
        'meta':{
            'datetime': datetime.datetime.now(),
            'user':     str(request.user),
        },
        'data': query_stats
    }
    
    return HttpResponse(json.dumps(data, indent=4, sort_keys=True, default=str), content_type="application/json")