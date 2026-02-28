from django.urls import path
from .views import HeartAttackPredictView, SepsisPredictView

urlpatterns = [
    path("predict/heart-attack/", HeartAttackPredictView.as_view()),
    path("predict/sepsis/", SepsisPredictView.as_view()),
]
