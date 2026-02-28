from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Widget
from cdss_api.serializers import WidgetSerializer


# Create your views here.

class WidgetListView(APIView):
    """
    View to list all widgets in the system.
    """
    def get(self, request, lower_limit, higher_limit):
        """
        List all widgets in the system.
        """
        widgets = Widget.objects.filter(id__gte=lower_limit, id__lte=higher_limit)
        serializer = WidgetSerializer(widgets, many=True)
        print(serializer.data)
        return Response(serializer.data)

class HealthCheckView(APIView):
    def post(self, request, widget_type):
        version = request.data.get('version', 'unknown')
        widget_name = ""
        if widget_type == 'heart-attack':
            widget_name = 'Heart Attack Widget'
        widget = Widget.objects.filter(name=widget_name)
        latest_version = widget.first().version if widget.exists() else 'unknown'

        if version != latest_version:
            return Response({
                "status": "update_required",
                "latest_version": latest_version,
                "message": f"A new version of {widget_name} is available. Please update to the latest version."
            }, status=426)  # 426 Upgrade Required
        else:
            return Response({
                "status": "ok",
                "message": f"You are using the latest version of {widget_name}."
            })

def NotFound(request, exception):
    return Response({"error": "Not Found"}, status=404)