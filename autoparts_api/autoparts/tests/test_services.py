from django.test import TestCase
from autoparts.services import AutoPartsImporter, CriticalErrorException, AutoPartsExporter
from autoparts.models import AutoPart, Category, Brand, Provider
from openpyxl import Workbook, load_workbook
from io import BytesIO

class AutoPartsImporterTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.get_or_create(name="Motor")
        self.brand = Brand.objects.get_or_create(name="MarcaA")
        self.provider = Provider.objects.get_or_create(name="ProvedorA")

    def test_import_valid_csv(self):
        csv_content = """code,name,description,stock,min_stock,unit_price,category,brand,provider,storage_location
APA-001,Part1,Description1,10,5,100.00,Motor,Marca,ProvedorA,AA-12-03
APA-002,Part2,Description2,20,10,200.00,Motor,Marca,ProvedorA,BB-13-04"""
        file = BytesIO(csv_content.encode('utf-8'))
        importer = AutoPartsImporter(file)
        result = importer.import_from_csv()
        self.assertEqual(result['count'], 2)
        self.assertEqual(AutoPart.objects.count(), 2)


    def test_import_invalid_csv(self):
        csv_content = """code,name,description,stock,min_stock,unit_price,category,brand,provider,storage_location
APA-001,Part1,Description1,10,5,100.00,Motor,Marca,ProvedorA,AAA-12-03
AA-002,Part2,Description2,20,10,invalid_price,Motor,Marca,ProvedorA,BB-13-04
AA-003,Part3,Description3,30,15,300.00,Motor,Marca,ProvedorA,CC-14-05"""

        file = BytesIO(csv_content.encode('utf-8'))
        importer = AutoPartsImporter(file)
        with self.assertRaises(CriticalErrorException) as context:
            importer.import_from_csv()

        self.assertIn("Import failed due to validation errors", str(context.exception))
        self.assertIn("Storage location must be in the format 'AA-12-03'", context.exception.errors[0]['storage_location'][0])
        self.assertIn("Code must be in the format 'AAA-001'", context.exception.errors[1]['code'][0])
        self.assertIn("A valid number is required.", context.exception.errors[1]['unit_price'][0])
        self.assertIn("Code must be in the format 'AAA-001'", context.exception.errors[2]['code'][0])
        self.assertEqual(AutoPart.objects.count(), 0)

class AutoPartsExporterTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.get_or_create(name="Motor")[0]
        self.brand = Brand.objects.get_or_create(name="Toyota")[0]
        self.provider = Provider.objects.get_or_create(name="Provedor A")[0]

        AutoPart.objects.create(code="AAA-001", name="Part 1", description="Description 1", stock=10, min_stock=5, unit_price=100.00, category=self.category, brand=self.brand, provider=self.provider, storage_location="B-12-03")
        AutoPart.objects.create(code="AAA-002", name="Part 2", description="Description2", stock=20, min_stock=10, unit_price=200.00, category=self.category, brand=self.brand, provider=self.provider, storage_location="B-12-04")

    def test_export_to_stream(self):
        autoparts = AutoPart.objects.all()
        exporter = AutoPartsExporter(autoparts)
        stream = exporter.export_to_stream()
        workbook = load_workbook(BytesIO(stream))
        sheet = workbook.active
        self.assertEqual(sheet.title, "Autopartes")
        self.assertEqual(sheet.cell(row=1, column=1).value, "Codigo")
        self.assertEqual(sheet.cell(row=2, column=1).value, "AAA-001")
        self.assertEqual(sheet.cell(row=3, column=1).value, "AAA-002")
