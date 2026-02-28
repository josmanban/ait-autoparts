# Autoparts Management System

Web app for managing auto parts and stock.

## Features

- Create, update, delete, and list auto parts
- Import from a CSV file
- Export to an Excel file
- Backend unit tests
- Backend validation through serializers
- Frontend testing using Jest and React Testing Library
- Frontend-side validation
- API documentation using Swagger
- Preloaded data from `autoparts_dump.sql` and a backend fixture
- Material UI styling
- Critical stock indicator (auto parts list page and auto part detail page)

## Projects

Each service is configured in the `compose.yaml` file, and every project folder contains a `Dockerfile`.

### How to run

#### Docker Compose (recommended)

```bash
docker compose up
```


```bash
# Important! Add the following hostnames to your hosts file:
# Linux/Mac: /etc/hosts
# Windows: C:\Windows\System32\drivers\etc\hosts
# 
# 127.0.0.1 autoparts.api
# 127.0.0.1 autoparts.client
# 127.0.0.1 autoparts.db
```

Then open http://localhost:3000 in your browser.


#### Individual Docker containers

You can also build and run each container separately:

```bash
cd autoparts_api
docker build -t autoparts.api:latest .
docker run -p 8000:8000 autoparts.api:latest
```

```bash
cd autoparts-client
docker build -t autoparts.client:latest .
docker run -p 3000:3000 autoparts.client:latest
```

Then open http://localhost:3000 in your browser.

In this case, you must set up an `.env` file in the `autoparts_api` folder root with database connection variables. You also need a MySQL database and must run migrations and load the fixture or execute the `autoparts_dump.sql` script.

```bash
# .env
# environment variables for autoparts_api

# database
MYSQL_DATABASE=autoparts
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
# host should point to your Docker container or host port
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
```

#### Running without Docker

```bash
cd autoparts_api
virtualenv venv -p /usr/bin/python3
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata ./autoparts/fixtures/autoparts.json # only the first time
python manage.py runserver 0.0.0.0:8000
```

```bash
cd autoparts-client
npm install
npm run dev
```

You still need a MySQL database and must run migrations and load the fixture or execute the `autoparts_dump.sql` script. Also don't forget to set up the `.env` file in the `autoparts_api` project.

Then open http://localhost:3000 in your browser.


### Autoparts API (`autoparts_api`)

The backend Django Rest Framework API.

### Autoparts client (`autoparts-client`)

The frontend client that consumes the Autoparts API.

## Testing

Run Autoparts API tests:

```bash
cd ./autoparts_api
python manage.py test
```

A test coverage report could be generated in the `htmlcov/index.html` file using the `coverage` package. We test views and services, including the Excel export and import features.
```bash
#Run your tests with coverage:
coverage run --source=autoparts manage.py test

#Generate a coverage report:
coverage report
#For an HTML report:
coverage html
#Then open htmlcov/index.html in your browser.
```

This is the current backendend testing coverage:
```bash
Name                                   Stmts   Miss  Cover
----------------------------------------------------------
autoparts/__init__.py                      0      0   100%
autoparts/admin.py                         1      0   100%
autoparts/apps.py                          3      0   100%
autoparts/exceptions.py                    4      0   100%
autoparts/filters.py                      15      1    93%
autoparts/migrations/0001_initial.py       7      0   100%
autoparts/migrations/__init__.py           0      0   100%
autoparts/models.py                       29      4    86%
autoparts/serializers.py                  86      3    97%
autoparts/services.py                     54      0   100%
autoparts/tests/__init__.py                0      0   100%
autoparts/tests/test_services.py          71      0   100%
autoparts/tests/test_views.py            232      0   100%
autoparts/urls.py                          9      0   100%
autoparts/validators.py                    3      0   100%
autoparts/views.py                        72      3    96%
----------------------------------------------------------
TOTAL                                    586     11    98%
```

Run Autoparts client tests:

```bash
cd ./autoparts-client
npm run test
```

We test the save form with validations, the list auto parts component, and the show auto part component.

## Export to Excel

The export-to-Excel feature is implemented using the `openpyxl` library.

## Import from CSV

This feature allows importing auto parts from a CSV file with the following column format:

```bash
code,name,description,stock,min_stock,unit_price,category,brand,provider,storage_location
APA-031,"Filtro de Combustible","Filtro de combustible para motores diésel.",45,10,25.00,Motor,Toyota,"Proveedor A",AG-12-03
```

To test this feature we have three different example files:

### Success

Import using the `valid_autoparts.csv` file. Only do this once; a second import will produce code-duplicate errors.

### Partial import

If you use the `valid_with_some_errors.csv` file, only valid auto parts will be imported and a summary of errors for the failing records will be shown.

### Fail with critical errors

Any of the following are critical error conditions:

- Invalid auto parts records count > half of the valid auto parts records count.
- Duplicate codes in the file.
- Duplicate storage locations in the file.
- Duplicate name and brand combination in the file.

In these cases, no auto parts will be imported (transaction rollback), and a summary of errors will be shown. Use either `fail_critical_errors_global.csv` or `fail_critical_errors.csv`.

All import scenarios are covered by backend unit tests using the same files.

## API Documentation

The API documentation is available on the Swagger page:

[http://localhost:8000/swagger/](http://localhost:8000/swagger/)

### Main API endpoints

- **GET /autoparts/** – Retrieve a list of auto parts with optional filtering by category name, brand name, provider name, critical stock level, page, and search criteria (name, description, code).
- **POST /autoparts/** – Create a new auto part with the provided details. Ensure that the code is unique and the storage location is valid.
- **GET /autoparts/export/** – Export auto parts data to an Excel file.
- **POST /autoparts/import/** – Import auto parts data from a CSV file.
- **GET /autoparts/{code}/** – Retrieve the details of a specific auto part by its code.
- **PUT /autoparts/{code}/** – Update an existing auto part's details. Note that the code cannot be changed and the storage location must be valid.
- **DELETE /autoparts/{code}/** – Delete a specific auto part by its code.

