from django.urls import path
from . import views

urlpatterns = [
    # path(ROUTE, VIEW, NAME)
    path('', views.index, name='index'),
    path('counter', views.counter, name='counter'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('post/<str:pk>', views.post, name='post')
]