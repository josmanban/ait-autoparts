'use client'
import { useState } from 'react';
import { Pagination } from '@mui/material';

export default function AutoPartPaginator(
    props: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        onPageChange: (page: number) => void;
    }
){
    
    return(
        <Pagination 
            count={Math.ceil(props.totalItems / props.itemsPerPage)} 
            page={props.currentPage} 
            onChange={(e, page) => props.onPageChange(page)}
        />
    );
}