'use client'
import { useState } from 'react';
import { AutoPart } from '@/src/models/AutoPart';
import CategoryComboBox from '../categoryComboBox/CategoryComboBox';
import { TextField, Button, SelectChangeEvent, FormControlLabel, Checkbox, Box } from '@mui/material';
import { Category } from '@/src/models/Category';


export interface Filters {
    categoryName?: string;
    search?: string;
    criticalStock?: boolean;
}

export default function AutoPartFilters(
    props: {
        onFilter: (filters: Filters) => void;
    }
){
    const [filters, setFilters] = useState<Filters>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onFilter(filters);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            
            <Box sx={{ display: 'inline-flex', alignItems: 'start', mr: 1}}>
            <TextField name="search" label="Code/Name/Description" variant="outlined" onChange={handleChange} sx={{ mr: 1, minWidth: 250 }} />
            <CategoryComboBox 
                name="categoryName" 
                handleChange={handleChange}
                selectedValue={undefined}
                hasEmptyOption={true}
                id="category-filter"
                getOptionValue={(option: Category) => option.name}
                fullWidth={false}
                margin={'none'}
                sx={{ mr: 1, minWidth: 200 }}
            />
            <FormControlLabel
                label="Critical Stock"
                sx={{minWidth:140}}
                control={<Checkbox 
                    checked={filters.criticalStock || false}
                    name="criticalStock"
                    onChange={(e) => {
                        const { name, checked } = e.target;
                        setFilters(prev => ({ ...prev, [name]: checked }));
                    }}
                    />}
                    />            
            <Button type="submit" variant="contained" color="primary">Filter</Button>
                    </Box>
        </form>
    );
}