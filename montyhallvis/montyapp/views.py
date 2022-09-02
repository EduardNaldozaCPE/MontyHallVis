from cgitb import html
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import HttpResponse

# Create your views here.
def index(request):
    # From the models file, import the Features Class/Model
    from .models import Features
    feat1 = Features.objects.all()
    return render(request, 'index.html', {'feats':feat1})

def counter(request):
    posts = [1,2,3,4,5,'tim','tom','john']
    return render(request, 'counter.html', {'posts':posts})

def register (request):
    if request.method == 'POST':
        uname = request.POST['username']
        emal = request.POST['email']
        pasw = request.POST['password']

        if User.objects.filter(email=emal).exists():
            messages.info(request, 'Email Already Used')
            return redirect('register')
        elif User.objects.filter(username=uname).exists():
            messages.info(request, 'Username Already Taken')
            return redirect('register')
        else:
            user = User.objects.create_user(username=uname, email=emal, password=pasw)
            user.save()
            return redirect('login')
    else:
        return render(request, 'register.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        print(user)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Invalid User')
            return redirect('login')
    else:
        return render(request, 'login.html')

def post(request, pk):
    return render(request, 'post.html', {'pk':pk})