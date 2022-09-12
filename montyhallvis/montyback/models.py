from django.db import models

# Create your models here.


class Stats(models.Model):
    winrate = models.DecimalField(default=0, decimal_places=2, max_digits=5)
    wrongCount = models.IntegerField(default=0)
    correctCount = models.IntegerField(default=0)
    icount = models.IntegerField(default=0)
    mode = models.IntegerField(default=0)

    @property
    def winrate_percent(self):
        return "%.2f" % (float(self.winrate) * 100)
