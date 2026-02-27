import { AutoPartShow } from "@/src/models/AutoPartShow";

import { TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
 } from "@mui/material";


export default function AutoPartTable(props:{
    autoParts: AutoPartShow[];
    onDelete: (code: string) => void;
    onEdit: (code: string) => void;
    onView: (code: string) => void;
}){

    return (
        <>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                <TableRow>                    
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Min Stock</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Provider</TableCell>
                    <TableCell align="right">Storage Location</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.autoParts.map((autoPart) => (
                        <TableRow
                        key={autoPart.code}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{autoPart.code}</TableCell>
                        <TableCell align="right">{autoPart.name}</TableCell>
                        <TableCell align="right">{autoPart.stock}</TableCell>
                        <TableCell align="right">{autoPart.min_stock}</TableCell>
                        <TableCell align="right">{autoPart.unit_price}</TableCell>
                        <TableCell align="right">{autoPart.category.name}</TableCell>
                        <TableCell align="right">{autoPart.brand.name}</TableCell>
                        <TableCell align="right">{autoPart.provider.name}</TableCell>
                        <TableCell align="right">{autoPart.storage_location}</TableCell>                        
                        <TableCell align="right">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="small" 
                                sx={{ mr: 1 }} 
                                onClick={() => props.onView(autoPart.code)}>
                                View
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="small" 
                                sx={{ mr: 1 }} 
                                onClick={() => props.onEdit(autoPart.code)}>
                                Edit
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                size="small" 
                                onClick={() => props.onDelete(autoPart.code)}>
                                Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );

}