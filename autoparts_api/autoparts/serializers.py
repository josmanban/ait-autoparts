from rest_framework import serializers
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

class AutoPartSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    provider = ProviderSerializer(read_only=True)

    class Meta:
        model = AutoPart
        fields = '__all__'

class AutoPartListCSVSerializer(serializers.ListSerializer):
    def validate(self, attrs):
        errors = []
        if len(attrs) == 0:
            errors.append("No data provided for import.")

        codes = [item.get('code') for item in attrs]
        if len(codes) != len(set(codes)):
            errors.append("Duplicate codes found in the input data.")

        locations = [item.get('storage_location') for item in attrs]
        if len(locations) != len(set(locations)):
            errors.append("Duplicate storage locations found in the input data.")

        names_and_brands = [(item.get('name'), item.get('brand')) for item in attrs]
        if len(names_and_brands) != len(set(names_and_brands)):
            errors.append("Duplicate name and brand combinations found in the input data.")

        if errors:
            raise CriticalErrorException("Critical errors found during import", errors)

        return super().validate(attrs)
    
    def save(self, **kwargs):
        return super().save(**kwargs)

class AutoPartCSVSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    brand = serializers.CharField(source='brand.name')
    provider = serializers.CharField(source='provider.name')
    storage_location = serializers.CharField(validators=[storage_location_validator])
    code = serializers.CharField(validators=[code_validator])

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
        return super().update(instance, validated_data)