from openpyxl import Workbook
from tempfile import NamedTemporaryFile
from django.db import transaction
from autoparts.serializers import AutoPartCSVSerializer, AutoPartListCSVSerializer
import csv
import io
from autoparts.exceptions import CriticalErrorException

class AutoPartsExporter:
    def __init__(self, autoparts):
        self.autoparts = autoparts

    def write_autoparts(self, workbook:Workbook):
        sheet = workbook.active
        sheet.title = "Autopartes"

        # Write header
        headers = ['Codigo', 'Nombre', 'Descripcion', 'Stock', 'Min Stock', 'Precio Unitario', 'Categoria', 'Marca', 'Proveedor']
        sheet.append(headers)

        # Write data rows
        for part in self.autoparts:
            row = [
                part.code,
                part.name,
                part.description,
                part.stock,
                part.min_stock,
                part.unit_price,
                part.category.name if part.category else '',
                part.brand.name if part.brand else '',
                part.provider.name if part.provider else '',
            ]
            sheet.append(row)

    def export_to_stream(self):
        workbook = Workbook()
        self.write_autoparts(workbook)
        with NamedTemporaryFile() as tmp:
            workbook.save(tmp.name)
            tmp.seek(0)
            # return the stream
            return tmp.read()


class AutoPartsImporter:
    def __init__(self, file):
        self.file = file

    @transaction.atomic
    def import_from_csv(self)-> dict:
        

        file_decoded = self.file.read().decode('utf-8').splitlines()
        io_string = io.StringIO('\n'.join(file_decoded))
        reader = csv.DictReader(io_string)
        data_list = list(reader)
        errors = {}

        autoparts_serializer = AutoPartCSVSerializer(
            data=data_list, 
            many=True)

        # only validate at list levet to check for
        # critical errors before any data is saved
        autoparts_serializer.is_valid()
        
        # validate one by one because we want to collect all errors and not stop at the first one
        count = 0
        errors_count=0
        for row, data in enumerate(data_list, start=1):
            serializer = AutoPartCSVSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                count += 1
            else:
                errors[row] = serializer.errors
                errors_count += 1
    
        # Critical error condition
        if errors_count > count * 0.5:  # If more than 50% of the records have errors, consider it a critical failure
            transaction.set_rollback(True)
            raise CriticalErrorException("Import failed due to validation errors", {
                'count':0,
                'errors': errors,
                'global_errors':None,
                'fail': True
            })

        return {'count': count, 'errors': errors, 'global_errors':None, 'fail': False}
        
    