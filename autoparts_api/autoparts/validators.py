from django.core.validators import RegexValidator

storage_location_validator = RegexValidator(
    regex=r'^[A-Z]{2}-\d{2}-\d{2}$',
    message="Storage location must be in the format 'AA-12-03' (Two uppercase letters followed by a hyphen and two digits, repeated twice)"
    )
code_validator = RegexValidator(
    regex=r'^[A-Z]{3}-\d{3}$',
    message="Code must be in the format 'AAA-001' (Three uppercase letters followed by a hyphen and three digits)"
    )