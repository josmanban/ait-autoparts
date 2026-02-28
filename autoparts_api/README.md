# AutoParts API

## Setup

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd autoparts_api
    ```

2. **Create a virtual environment**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment variables**
    ```bash
    cp .env.example .env
    # Edit .env with your settings
    ```

5. **Run migrations**
    ```bash
    python manage.py migrate
    ```

6. **Create a superuser** (optional)
    ```bash
    python manage.py createsuperuser
    ```

## Running the Project

Start the development server:
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`

## API Documentation

Visit `http://127.0.0.1:8000/api/docs/` for API endpoints documentation.

## Testing

Run tests with:
```bash
python manage.py test
```