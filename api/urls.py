from django.urls import path

from api import views

urlpatterns = [
   path('widgets/<lower_limit>/<higher_limit>', views.WidgetListView.as_view(), name='widget-list'),
   path('health/<widget_type>', views.HealthCheckView.as_view(), name='health-check'),
]