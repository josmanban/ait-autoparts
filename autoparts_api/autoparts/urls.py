from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AutoPartViewSet, ProviderViewSet, BrandViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'autoparts', AutoPartViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'providers', ProviderViewSet)
urlpatterns = [
    path('', include(router.urls)),
]