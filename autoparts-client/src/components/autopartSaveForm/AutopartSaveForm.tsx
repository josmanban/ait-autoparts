'use-client'

import { useEffect, useState } from 'react';
import { AutoPart } from '@/src/models/AutoPart';
import CategoryComboBox from '../categoryComboBox/CategoryComboBox';
import ProviderComboBox from '../providerComboBox/ProviderComboBox';
import BrandComboBox from '../brandComboBox/BrandComboBox';
import { TextField, Button, SelectChangeEvent, Grid } from '@mui/material';
import useAutoPart from '@/src/hooks/useAutoPart';
import HttpError from '@/src/services/HttpError';
import { useContext } from 'react';
import GlobalContext from '@/src/contexts/GlobalContext';
import { init } from 'next/dist/compiled/webpack/webpack';

interface Errors {
    code?: string[];
    name?: string[];
    description?: string[];
    unit_price?: string[];
    stock?: string[];
    min_stock?: string[];
    category?: string[];
    provider?: string[];
    brand?: string[];
    storage_location?: string[];
}

interface Validator {
    validate: (value: any) => boolean;
    message: string;
}

const validators = {
    name: [
        {
            validate: (value: string) => value.trim() !== '', 
            message: 'Name is required'
        }
    ],
    unit_price: [
        {
            validate: (value: string) => value !== '', 
            message: 'Unit price is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Unit price must be non-negative'
        }
    ],
    stock: [
        {
            validate: (value: string) => value !== '', 
            message: 'Stock is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Stock must be non-negative'
        }
    ],
    min_stock: [
        {
            validate: (value: string) => value !== '', 
            message: 'Minimum stock is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Minimum stock must be non-negative'
        }
    ],
    category: [
        {
            validate: (value: any) => value !== undefined && value !== null && value !== '', 
            message: 'Category is required'
        }
    ],
    provider: [
        {
            validate: (value: any) => value !== undefined && value !== null && value !== '', 
            message: 'Provider is required'
        }
    ],
    brand: [
        {
            validate: (value: any) => value !== undefined && value !== null && value !== '', 
            message: 'Brand is required'
        }
    ],
    storage_location: [
        {
            validate: (value: string) => value.trim() !== '', 
            message: 'Storage location is required'
        },
        {
            validate: (value: string) => {
                const regex = /^[A-Z]{2}-\d{2}-\d{2}$/
                return regex.test(value);
            },
            message: 'Storage location must be in format XX-NN-NN'
        }
    ],
}


export default function AutopartSaveForm(
    props: {
        onSubmit?: (autopart: AutoPart) => void;
        initialData?: AutoPart;
    }
){
    const { createAutoPart, updateAutoPart } = useAutoPart();
    const { setToastProps } = useContext(GlobalContext);
    const [formData, setFormData] = useState<AutoPart>({
        code: props.initialData?.code || '',
        name: props.initialData?.name || '',
        description: props.initialData?.description || '',
        unit_price: props.initialData?.unit_price || 0,
        stock: props.initialData?.stock || 0,
        min_stock: props.initialData?.min_stock || 0,
        category: props.initialData?.category || undefined,
        provider: props.initialData?.provider || undefined,
        brand: props.initialData?.brand || undefined,
        storage_location: props.initialData?.storage_location || '',
    });

    const [errors, setErrors] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name: string, value: any) => {
        const fieldValidators = (validators as any)[name] as Validator[] | undefined;
        if(!fieldValidators) return null;

        const fieldErrors: string[] = [];
        for(const validator of fieldValidators){
            if(!validator.validate(value)){
                fieldErrors.push(validator.message);
            }
        }
        if(fieldErrors.length > 0){
            setErrors((prev: any) => ({ ...prev, [name]: fieldErrors }));
        } else {
            setErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    const isValid = (formData: AutoPart) => {
        let valid = true;
        let newErrors: any = {};
        for(const field in validators){
            const fieldValidators = (validators as any)[field] as Validator[];
            for(const validator of fieldValidators){
                if(!validator.validate((formData as any)[field])){
                    valid = false;
                    if(!newErrors[field]){
                        newErrors[field] = [];
                    }
                    newErrors[field].push(validator.message);
                }
            }
        }
        setErrors(newErrors);
        return valid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const successMessage = props.initialData ? 'Autopart updated' : 'Autopart created';
        const errorMessage = props.initialData ? 'Error updating autopart' : 'Error creating autopart';
        
        if(!isValid(formData)){
            setToastProps({
                open: true,
                severity: 'error',
                message: 'Please fix the errors in the form'
           });
            return;
        }
        

        try{
            if(props.initialData){
                await updateAutoPart(props.initialData.code!, formData);
            } else {
                await createAutoPart(formData);
            }
            setToastProps({
                open: true,
                severity: 'success',
                message: successMessage,
            });
            props.onSubmit?.(formData);
        } catch (error){
            if(error instanceof HttpError){
                setToastProps({
                    open: true,
                    severity: 'error',
                    message: error.body?.non_field_errors ? error.body.non_field_errors.join(', ') : errorMessage
                });
                setErrors(error.body);
                return;
            }
            setToastProps({
                open: true,
                severity: 'error',
                message: errorMessage
            });
        }
    }

    return (
        <Grid container spacing={2}>
        <form onSubmit={handleSubmit}>
            {props.initialData && (
            <TextField 
                label="Code" 
                name="code" 
                value={formData.code} 
                onChange={handleChange}
                helperText={errors?.code ? errors.code.join(', ') : ''}    
                error={!!errors?.code}
                disabled={true}
                fullWidth margin="normal" required />
            )}
            <TextField 
                label="Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                helperText={errors?.name ? errors.name.join(', ') : ''}    
                error={!!errors?.name}
                fullWidth margin="normal"/>
            <TextField 
                label="Description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                helperText={errors?.description ? errors.description.join(', ') : ''}                 
                error={!!errors?.description}
                fullWidth margin="normal" multiline rows={4} />
            <TextField 
                label="Unit Price" 
                name="unit_price" type="number" 
                value={formData.unit_price} 
                onChange={handleChange}
                helperText={errors?.unit_price ? errors.unit_price.join(', ') : ''}    
                error={!!errors?.unit_price}
                fullWidth margin="normal" />
            <TextField 
                label="Stock" 
                name="stock" type="number" 
                value={formData.stock} 
                onChange={handleChange}
                helperText={errors?.stock ? errors.stock.join(', ') : ''}    
                error={!!errors?.stock}
                fullWidth margin="normal" />
            <TextField 
                label="Min Stock" 
                name="min_stock" type="number" 
                value={formData.min_stock} 
                onChange={handleChange}
                helperText={errors?.min_stock ? errors.min_stock.join(', ') : ''}    
                error={!!errors?.min_stock}
                fullWidth margin="normal"  />
            <CategoryComboBox 
                handleChange={handleChange} 
                selectedValue={formData.category} 
                name="category" 
                id="category" 
                hasEmptyOption
                error={!!errors?.category}
                helperText={errors?.category ? errors.category.join(', ') : ''}
            />
            <ProviderComboBox
                handleChange={handleChange}
                selectedValue={formData.provider}
                name="provider"
                id="provider"
                hasEmptyOption 
                error={!!errors?.provider}
                helperText={errors?.provider ? errors.provider.join(', ') : ''}
            />
            <BrandComboBox
                handleChange={handleChange}
                selectedValue={formData.brand}
                name="brand"
                id="brand"
                hasEmptyOption
                error={!!errors?.brand}
                helperText={errors?.brand ? errors.brand.join(', ') : ''}
            />
            <TextField 
                label="Storage Location"
                name="storage_location" 
                value={formData.storage_location} 
                onChange={handleChange}
                helperText={errors?.storage_location ? errors.storage_location.join(', ') : ''}                
                error={!!errors?.storage_location}
                fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary">{props.initialData ? 'Update' : 'Create'}</Button>
        </form>
        </Grid>
    )

}  