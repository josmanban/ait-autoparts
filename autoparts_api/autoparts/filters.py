import django_filters
from django.db.models import F
from .models import AutoPart


class AutoPartFilter(django_filters.FilterSet):
    category_name = django_filters.CharFilter(field_name='category__name', lookup_expr='icontains')
    brand_name = django_filters.CharFilter(field_name='brand__name', lookup_expr='icontains')
    provider_name = django_filters.CharFilter(field_name='provider__name', lookup_expr='icontains')
    critical_stock = django_filters.BooleanFilter(method='filter_critical_stock')

    class Meta:
        model = AutoPart
        fields = ['category_name', 'brand_name', 'provider_name']

    def filter_critical_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock__lte=F('min_stock'))
        return queryset.filter(stock__gt=F('min_stock'))
