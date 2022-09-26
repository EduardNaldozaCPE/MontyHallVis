import random
from time import sleep
import requests
from montymain import MontyHall_single

if (__name__ == "__main__"):
    for i in range(3):
        mode = i
        endp = f'http://127.0.0.1:8000/API/score/{mode}'
        getData = requests.get(endp).json()
        requests.put(
            endp, data={'correctCount': 0, 'wrongCount': 0})
