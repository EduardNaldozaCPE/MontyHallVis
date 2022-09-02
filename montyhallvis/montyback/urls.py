from django.urls import path
from .views import scoreAPI

app_name = 'montyback'
urlpatterns = [
    path('score/', scoreAPI, name='scoreAPI')
]