from django.shortcuts import render
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import action
from django.http import HttpResponse
from autoparts.models import AutoPart, Category, Brand, Provider
from autoparts.serializers import AutoPartSerializer, AutoPartCreateUpdateSerializer, CategorySerializer, BrandSerializer, ProviderSerializer
from autoparts.filters import AutoPartFilter
from autoparts.services import AutoPartsExporter, AutoPartsImporter, CriticalErrorException
from rest_framework.response import Response
from rest_framework import status

@method_decorator(
    name='list', 
    decorator=swagger_auto_schema(
        operation_description="Retrieve a list of auto parts with optional filtering by category name, brand name, provider name, critical stock level, page and search criteria (name, description, code)."
    ))
@method_decorator(
    name='create',
    decorator=swagger_auto_schema(
        operation_description="Create a new auto part with the provided details. Ensure that the code is unique and the storage location is valid." 
    ))
@method_decorator(
    name='update',
    decorator=swagger_auto_schema(
        operation_description="Update an existing auto part's details. Note that the code cannot be changed and the storage location must be valid."
    ))
@method_decorator(
    name='retrieve',
    decorator=swagger_auto_schema(
        operation_description="Retrieve the details of a specific auto part by its code."
    ))
@method_decorator(
    name='destroy',
    decorator=swagger_auto_schema(
        operation_description="Delete a specific auto part by its code."
    ))

class AutoPartViewSet(ModelViewSet):
    """
    AutoPartViewSet
    This viewset provides CRUD operations and additional actions for managing auto parts in the Auto Parts API.
    It handles:
    - Listing auto parts with optional filtering by critical stock levels
    - Creating new auto parts with unique codes and valid storage locations
    - Updating existing auto parts (code is immutable, storage location must be valid)
    - Retrieving specific auto part details by code
    - Deleting auto parts by code
    - Exporting auto parts data to Excel format
    - Importing auto parts data from CSV files
    Attributes:
        queryset: Returns all AutoPart objects from the database
        search_fields: Enables search across 'name', 'description', and 'code' fields
        filterset_class: Uses AutoPartFilter for advanced filtering capabilities
    Methods:
        get_serializer: Dynamically selects the appropriate serializer based on HTTP method
        export: Exports all auto parts to an Excel spreadsheet
        import_csv: Imports auto parts data from an uploaded CSV file
    """

    queryset = AutoPart.objects.all()
    search_fields = ['name', 'description', 'code']
    filterset_class = AutoPartFilter

    def get_serializer(self, *args, **kwargs):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return AutoPartCreateUpdateSerializer(*args, **kwargs)
        return AutoPartSerializer(*args, **kwargs)

    @swagger_auto_schema(method='get', operation_description="Export auto parts data to an Excel file.")
    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request, *args, **kwargs):
        exporter = AutoPartsExporter(AutoPart.objects.all())
        workbook_stream = exporter.export_to_stream()
        response = HttpResponse(workbook_stream, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="autoparts.xlsx"'
        return response

    @swagger_auto_schema(method='post', operation_description="Import auto parts data from a CSV file.")
    @action(detail=False, methods=['post',], url_path='import')
    def import_csv(self, request, *args, **kwargs):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response("No file uploaded", status=status.HTTP_400_BAD_REQUEST)        
        try:
            importer = AutoPartsImporter(csv_file)
            result = importer.import_from_csv()
            return Response(result, status=status.HTTP_200_OK)
        except CriticalErrorException as e:
            return Response(e.summary, status=status.HTTP_400_BAD_REQUEST)
        
@method_decorator(
    name='list',
    decorator=swagger_auto_schema(
        operation_description="Retrieve a list of all categories available in the system."
    ))    
@method_decorator(
    name='retrieve',
    decorator=swagger_auto_schema(
    operation_description="Retrieve the details of a specific category by its ID."
    ))
class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None
    search_fields = []
    filterset_class = None
    filter_backends = []

@method_decorator(
    name='list',
    decorator=swagger_auto_schema(
        operation_description="Retrieve a list of all brands available in the system."
    ))
@method_decorator(
    name='retrieve',
    decorator=swagger_auto_schema(
    operation_description="Retrieve the details of a specific brand by its ID."
    ))
class BrandViewSet(ReadOnlyModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    pagination_class = None
    search_fields = []
    filterset_class = None
    filter_backends = []


@method_decorator(
    name='list',
    decorator=swagger_auto_schema(
        operation_description="Retrieve a list of all providers available in the system."
    ))
@method_decorator(
    name='retrieve',
    decorator=swagger_auto_schema(
    operation_description="Retrieve the details of a specific provider by its ID."
    ))
class ProviderViewSet(ReadOnlyModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    pagination_class = None
    search_fields = []
    filterset_class = None
    filter_backends = []
