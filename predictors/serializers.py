from rest_framework import serializers

class HeartAttackRequestSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=0, max_value=120)
    sex = serializers.IntegerField(min_value=0, max_value=1)  # 0=female, 1=male
    chol = serializers.FloatField(min_value=0)
    trestbps = serializers.FloatField(min_value=0)

class SepsisRequestSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=0, max_value=120)
    sex = serializers.IntegerField(min_value=0, max_value=1)  # 0=female, 1=male
    chol = serializers.FloatField(min_value=0)
    trestbps = serializers.FloatField(min_value=0)