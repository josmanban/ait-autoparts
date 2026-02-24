from django.db import models
from django.core.validators import MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Provider(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Create your models here.
class AutoPart(models.Model):
    code = models.CharField(max_length=50, primary_key=True, unique=True)
    name = models.CharField(max_length=100, null=False)
    description = models.TextField()
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    min_stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    storage_location = models.CharField(max_length=100)

    class Meta:
        unique_together = ('name', 'brand')

    def __str__(self):
        return self.name
