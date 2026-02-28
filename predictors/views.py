from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from predictors.model import predict_heart_attack, predict_sepsis
from predictors.serializers import HeartAttackRequestSerializer, SepsisRequestSerializer


# from .model import predict_heart_attack


class HeartAttackPredictView(APIView):

    def post(self, request):
        serializer = HeartAttackRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        result = predict_heart_attack(
            age=data["age"],
            sex=data["sex"],
            chol=data["chol"],
            trestbps=data["trestbps"],
        )

        return Response(
            {
                "model": "heart_attack_v1",
                "input": data,
                "result": result
            },
            status=status.HTTP_200_OK
        )

class SepsisPredictView(APIView):

    def post(self, request):
        serializer = SepsisRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        result = predict_sepsis(
            age=data["age"],
            sex=data["sex"],
            chol=data["chol"],
            trestbps=data["trestbps"],
        )

        return Response(
            {
                "model": "heart_attack_v1",
                "input": data,
                "result": result
            },
            status=status.HTTP_200_OK
        )