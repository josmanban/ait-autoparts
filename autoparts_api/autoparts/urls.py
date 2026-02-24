from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AutoPartViewSet

router = DefaultRouter()
router.register(r'autoparts', AutoPartViewSet)
urlpatterns = [
    path('', include(router.urls)),
]