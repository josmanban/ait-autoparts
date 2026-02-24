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
        errors = []
        fail= False

        autoparts_serializer = AutoPartCSVSerializer(
            data=data_list, 
            many=True)

        # aux_data = autoparts_serializer.to_internal_value(autoparts_serializer.initial_data)
        # only validate the data without saving to the database
        # to check for critical errors before any data is saved
        # autoparts_serializer.validate(aux_data)

        
        # validate one by one and save valid records
        count = 0
        for data in data_list:
            serializer = AutoPartCSVSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                count += 1
            else:
                errors.append(serializer.errors)
    
        # Critical error condition
        if len(errors) > count * 0.5:  # If more than 50% of the records have errors, consider it a critical failure
            transaction.set_rollback(True)
            fail = True
            raise CriticalErrorException("Import failed due to validation errors", errors)
        
        

        return {'count': count, 'errors': errors, 'fail': fail}
        
    