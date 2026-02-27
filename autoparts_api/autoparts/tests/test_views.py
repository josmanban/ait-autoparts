from django.test import TestCase
from django.urls import reverse
from io import BytesIO
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from autoparts.models import AutoPart, Category, Brand, Provider 


class TestCreateAutoPart(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")

    def test_create_autopart(self):
        url = reverse('autopart-list')
        data = {
            "name": "Part1",
            "description": "Description1",
            "stock": 10,
            "min_stock": 5,
            "unit_price": 100.00,
            "category": self.category.id,
            "brand": self.brand.id,
            "provider": self.provider.id,
            "storage_location": "AA-12-03"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AutoPart.objects.count(), 1)

    def test_create_autopart_fail_invalid(self):
        url = reverse('autopart-list')
        data = {
            "name": "Part1",
            "description": "Description1",
            "stock": 10,
            "min_stock": 5,
            "unit_price": 100.00,
            "category": self.category.id,
            "brand": self.brand.id,
            "provider": self.provider.id,
            "storage_location": "AAA"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Storage location must be in the format 'AA-12-03'", str(response.data['storage_location'][0]))
    
    def test_create_autopart_fail_duplicate_name_brand(self):
        AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )
        url = reverse('autopart-list')
        data = {
            "code": "APA-002", 
            "name": "Part1", # Duplicate name and brand combination
            "description": "Description2",
            "stock": 20,
            "min_stock": 10,
            "unit_price": 200.00,
            "category": self.category.id, 
            "brand": self.brand.id, # Duplicate name and brand combination
            "provider": self.provider.id,
            "storage_location": "BB-13-04"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("An AutoPart with this name and brand already exists.", str(response.data['non_field_errors'][0]))
        self.assertEqual(AutoPart.objects.count(), 1)

class TestUpdateAutoPart(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")
        self.autopart = AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )

    def test_update_autopart_pass(self):
        url = reverse('autopart-detail', args=[self.autopart.code])
        data = {
            "code": "APA-001",
            "name": "Part1 Updated",
            "description": "Description1 Updated",
            "stock": 15,
            "min_stock": 7,
            "unit_price": 150.00,
            "category": self.category.id,
            "brand": self.brand.id,
            "provider": self.provider.id,
            "storage_location": "AA-12-03"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.autopart.refresh_from_db()
        self.assertEqual(self.autopart.name, 'Part1 Updated')
        self.assertEqual(self.autopart.description, 'Description1 Updated')
        self.assertEqual(self.autopart.stock, 15)
        self.assertEqual(self.autopart.min_stock, 7)
        self.assertEqual(float(self.autopart.unit_price), 150.00)

    def test_update_autopart_fail_invalid(self):
        url = reverse('autopart-detail', args=[self.autopart.code])
        data = {
            "name": "Part1 Updated",
            "description": "Description1 Updated",
            "stock": 15,
            "min_stock": 7,
            "unit_price": 150.00,
            "category": self.category.id,
            "brand": self.brand.id,
            "provider": self.provider.id,
            "storage_location": "AAA"  # Invalid storage location format
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Storage location must be in the format 'AA-12-03'", str(response.data['storage_location'][0]))

    def test_update_autopart_fail_duplicate_name_brand(self):
        # Create another autopart with a different code but same name and brand
        AutoPart.objects.create(
            code="APA-002",
            name="Part2",  # Duplicate name and brand combination
            description="Description2",
            stock=20,
            min_stock=10,
            unit_price=200.00,
            category=self.category,
            brand=self.brand,  # Duplicate name and brand combination
            provider=self.provider,
            storage_location="BB-13-04"
        )
        url = reverse('autopart-detail', args=[self.autopart.code])
        data = {
            "code": "APA-001",
            "name": "Part2",  # Duplicate name and brand combination
            "description": "Description1 Updated",
            "stock": 15,
            "min_stock": 7,
            "unit_price": 150.00,
            "category": self.category.id,
            "brand": self.brand.id,  # Duplicate name and brand combination
            "provider": self.provider.id,
            "storage_location": "AA-12-03"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("An AutoPart with this name and brand already exists.", str(response.data['non_field_errors'][0]))

class TestListAutoParts(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")
        self.autopart1 = AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )
        AutoPart.objects.create(
            code="APA-002",
            name="Part2",
            description="Description2",
            stock=20,
            min_stock=10,
            unit_price=200.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="BB-13-04"
        )

    def test_list_autoparts_pass(self):
        url = reverse('autopart-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['code'], 'APA-001')
        self.assertEqual(response.data['results'][1]['code'], 'APA-002')

    def test_list_autoparts_filter_by_category_name(self):
        url = reverse('autopart-list') + '?category_name=Motor'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['code'], 'APA-001')
        self.assertEqual(response.data['results'][1]['code'], 'APA-002')

    def test_list_autoparts_filter_by_critical_stock(self):
        self.autopart1.stock = 4  # Set stock below min_stock to make it critical
        self.autopart1.save()
        url = reverse('autopart-list') + '?critical_stock=true'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['code'], 'APA-001')

    def test_list_autoparts_search_by_name(self):
        url = reverse('autopart-list') + '?search=Part1'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['code'], 'APA-001')


class TestDeleteAutoPart(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")
        self.autopart = AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )

    def test_delete_autopart_pass(self):
        url = reverse('autopart-detail', args=[self.autopart.code])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AutoPart.objects.count(), 0)

class TestRetrieveAutoPart(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")
        self.autopart = AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )

    def test_retrieve_autopart_pass(self):
        url = reverse('autopart-detail', args=[self.autopart.code])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['code'], 'APA-001')
        self.assertEqual(response.data['name'], 'Part1')
        self.assertEqual(response.data['description'], 'Description1')
        self.assertEqual(response.data['stock'], 10)
        self.assertEqual(response.data['min_stock'], 5)
        self.assertEqual(float(response.data['unit_price']), 100.00)
        self.assertEqual(response.data['category']['name'], 'Motor')
        self.assertEqual(response.data['brand']['name'], 'Marca A')
        self.assertEqual(response.data['provider']['name'], 'Provedor A')
    
    def test_retrieve_autopart_not_found(self):
        url = reverse('autopart-detail', args=['NON-EXISTENT'])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestAutopartExportToExcel(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")
        AutoPart.objects.create(
            code="APA-001",
            name="Part1",
            description="Description1",
            stock=10,
            min_stock=5,
            unit_price=100.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="AA-12-03"
        )
        AutoPart.objects.create(
            code="APA-002",
            name="Part2",
            description="Description2",
            stock=20,
            min_stock=10,
            unit_price=200.00,
            category=self.category,
            brand=self.brand,
            provider=self.provider,
            storage_location="BB-13-04"
        )
    
    def test_export_autoparts_to_excel(self):
        url = reverse('autopart-export')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        self.assertIn('attachment; filename="autoparts.xlsx"', response['Content-Disposition'])


class TestAutoPartImportFromCSV(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category, _ = Category.objects.get_or_create(name="Motor")
        self.brand, _ = Brand.objects.get_or_create(name="Marca A")
        self.provider, _ = Provider.objects.get_or_create(name="Provedor A")

    def test_import_autoparts_from_csv_pass(self):
        url = reverse('autopart-import-csv')
        csv_content = b"""code,name,description,stock,min_stock,unit_price,category,brand,provider,storage_location
APA-001,Part1,Description1,10,5,100.00,Motor,Marca A,Provedor A,AA-12-03
APA-002,Part2,Description2,20,10,200.00,Motor,Marca A,Provedor A,BB-13-04
"""
        csv_file = SimpleUploadedFile("autoparts.csv", csv_content, content_type="text/csv")
        response = self.client.post(url, {'file': csv_file}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AutoPart.objects.count(), 2)
        self.assertTrue(AutoPart.objects.filter(code='APA-001').exists())
        self.assertTrue(AutoPart.objects.filter(code='APA-002').exists())


class TestListCategories(TestCase):
    def setUp(self):
        self.client = APIClient()
        Category.objects.create(name="Motor")
        Category.objects.create(name="Transmisión")

    def test_list_categories(self):
        url = reverse('category-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Motor')
        self.assertEqual(response.data[1]['name'], 'Transmisión')

class TestRetrieveCategory(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="Motor")

    def test_retrieve_category(self):
        url = reverse('category-detail', args=[self.category.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Motor')

class TestListBrands(TestCase):
    def setUp(self):
        self.client = APIClient()
        Brand.objects.create(name="Marca A")
        Brand.objects.create(name="Marca B")

    def test_list_brands(self):
        url = reverse('brand-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Marca A')
        self.assertEqual(response.data[1]['name'], 'Marca B')

class TestRetrieveBrand(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.brand = Brand.objects.create(name="Marca A")

    def test_retrieve_brand(self):
        url = reverse('brand-detail', args=[self.brand.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Marca A')

class TestListProviders(TestCase):
    def setUp(self):
        self.client = APIClient()
        Provider.objects.create(name="Provedor A")
        Provider.objects.create(name="Provedor B")

    def test_list_providers(self):
        url = reverse('provider-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Provedor A')
        self.assertEqual(response.data[1]['name'], 'Provedor B')

class TestRetrieveProvider(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.provider = Provider.objects.create(name="Provedor A")

    def test_retrieve_provider(self):
        url = reverse('provider-detail', args=[self.provider.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Provedor A')
