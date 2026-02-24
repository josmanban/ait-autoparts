from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.http import HttpResponse
from autoparts.models import AutoPart, Category, Brand, Provider
from autoparts.serializers import AutoPartSerializer, CategorySerializer, BrandSerializer, ProviderSerializer
from autoparts.filters import AutoPartFilter
from autoparts.services import AutoPartsExporter, AutoPartsImporter, CriticalErrorException

# Create your views here.
class AutoPartViewSet(ModelViewSet):
    queryset = AutoPart.objects.all()
    serializer_class = AutoPartSerializer
    search_fields = ['name', 'description', 'code']
    filterset_class = AutoPartFilter

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request, *args, **kwargs):
        exporter = AutoPartsExporter(AutoPart.objects.all())
        workbook_stream = exporter.export_to_stream()
        response = HttpResponse(workbook_stream, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="autoparts.xlsx"'
        return response

    @action(detail=False, methods=['post'], url_path='import')
    def import_csv(self, request, *args, **kwargs):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return HttpResponse("No file uploaded", status=400)
        
        try:
            importer = AutoPartsImporter(csv_file)
            result = importer.import_from_csv()
            return HttpResponse(result, status=200)
        except CriticalErrorException as e:
            return HttpResponse(e.errors, status=400)
        
    
