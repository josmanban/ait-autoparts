'use client'
import { Chip } from '@mui/material';

export default function CriticalStockChip(props: { 
    min_stock: number,
    stock: number
}) {
    const { min_stock, stock } = props;
    const isCritical = stock <= min_stock;
    return (
        <>
        {isCritical && (
            <Chip 
            label={`critical`} 
            color={'error'} 
            size="small"
            sx={{ marginLeft: 1 }}
            />)  }
        </>
    );
};