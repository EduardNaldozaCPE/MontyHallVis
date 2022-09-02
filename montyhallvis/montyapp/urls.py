from django.urls import path
from .views import index

app_name = 'montyapp'
urlpatterns = [
    path('', index, name='index'),
    path('home/', index, name='home'),
]