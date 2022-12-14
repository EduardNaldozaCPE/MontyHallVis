from rest_framework import serializers
from .models import Stats


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = [
            'id',
            'winrate',
            'wrongCount',
            'correctCount',
            'icount',
            'mode',
            'winrate_percent',
        ]
