from django.urls import path
from .views import scoreAPI, scoreDetail

app_name = 'montyback'
urlpatterns = [
    path('score', scoreAPI, name='scoreAPI'),
    path('score/<int:mode>', scoreDetail, name='scoreDetail')
]
