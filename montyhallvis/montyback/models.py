from django.db import models

# Create your models here.
class LiveScore(models.Model):
    isWin = models.BooleanField(default=False)

class Stats(models.Model):
    winrate = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    avg = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    wrongCount = models.IntegerField(default=0)
    correctCount = models.IntegerField(default=0)
    count = models.IntegerField(default=0)