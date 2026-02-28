import random
import string
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from autoparts.models import AutoPart, Category, Brand, Provider
from autoparts.validators import storage_location_validator, code_validator
from autoparts.exceptions import CriticalErrorException

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__' 

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'

class AutoPartCreateUpdateSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=False, allow_blank=True)
    storage_location = serializers.CharField(validators=[storage_location_validator])

    class Meta:
        model = AutoPart
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=AutoPart.objects.all(),
                fields=['name', 'brand'],
                message="An AutoPart with this name and brand already exists."
            )
        ]
    
    def create(self, validated_data):
        code = generate_autopart_code()
        validated_data['code'] = code
        return super().create(validated_data)
    

def generate_autopart_code():
    while True:        
        code = ''.join(random.choices(string.ascii_uppercase, k=3))
        number = ''.join(random.choices(string.digits, k=3))
        full_code = f"{code}{number}"
        if not AutoPart.objects.filter(code=full_code).exists():
            return full_code
        else:
            return generate_autopart_code()


class AutoPartSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    provider = ProviderSerializer(read_only=True)

    class Meta:
        model = AutoPart
        fields = '__all__'

class AutoPartListCSVSerializer(serializers.ListSerializer):
    """
    Serializer for handling bulk CSV imports of AutoPart objects.
    This ListSerializer performs validation on batches of auto part data,
    checking for data consistency and uniqueness constraints before processing.
    Attributes:
        None (inherits from serializers.ListSerializer)
    Methods:
        run_validation(data): Validates the input data for critical errors
    """
        
        
    """
    Validate the input data for critical import errors.
    Performs the following checks:
    - Ensures data is not empty
    - Checks for duplicate auto part codes
    - Checks for duplicate storage locations
    - Checks for duplicate name and brand combinations
    Args:
        data (list): List of dictionaries containing auto part data to validate
    Returns:
        bool: True if all validations pass
    Raises:
        CriticalErrorException: If any validation checks fail, containing
                                a list of all error messages found
    """

    def run_validation(self, data):
        errors = []
        if len(data) == 0:
            errors.append("No data provided for import.")

        codes = [item.get('code') for item in data]
        if len(codes) != len(set(codes)):
            errors.append("Duplicate codes found in the input data.")

        locations = [item.get('storage_location') for item in data]
        if len(locations) != len(set(locations)):
            errors.append("Duplicate storage locations found in the input data.")

        names_and_brands = [(item.get('name'), item.get('brand')) for item in data]
        if len(names_and_brands) != len(set(names_and_brands)):
            errors.append("Duplicate name and brand combinations found in the input data.")

        if errors:
            raise CriticalErrorException("Import failed due to validation errors", {
                'count':0,
                'errors': None,
                'global_errors':errors,
                'fail': True,
                'success_records': [],
                'failed_records': [{'row': row, 'data': ','.join(item.values()), 'errors':[]} for row,item in enumerate(data, start=1)]
            })
        return True

class AutoPartCSVSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    brand = serializers.CharField(source='brand.name')
    provider = serializers.CharField(source='provider.name')
    storage_location = serializers.CharField(validators=[storage_location_validator])
    code = serializers.CharField(validators=
                                 [
                                    UniqueValidator(queryset=AutoPart.objects.all(), message="AutoPart with this code already exists."),   
                                    code_validator])

    class Meta:
        model = AutoPart
        fields = ['code', 'name', 'description', 'stock', 'min_stock', 'unit_price', 'category', 'brand', 'provider', 'storage_location']
        list_serializer_class = AutoPartListCSVSerializer

    def create(self, validated_data):
        category_name = validated_data.pop('category')['name']
        brand_name = validated_data.pop('brand')['name']
        provider_name = validated_data.pop('provider')['name']

        category, _ = Category.objects.get_or_create(
            name__iexact=category_name,
            defaults={'name': category_name.lower().capitalize()}
            )
        brand, _ = Brand.objects.get_or_create(
            name__iexact=brand_name,
            defaults={'name': brand_name.lower().capitalize()}
            )
        provider, _ = Provider.objects.get_or_create(
            name__iexact=provider_name,
            defaults={'name': provider_name.lower().capitalize()}
        )

        validated_data['category'] = category
        validated_data['brand'] = brand
        validated_data['provider'] = provider
        return super().create(validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Update operation is not supported for CSV import.")