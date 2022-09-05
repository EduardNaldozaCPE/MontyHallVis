from cgitb import html
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse

# Create your views here.


def index(request, *args, **kwargs):
    # From the models file, import the Features Class/Model
    from .models import Features
    feat1 = Features.objects.all()
    return render(request, 'index.html', {'feats': feat1})
