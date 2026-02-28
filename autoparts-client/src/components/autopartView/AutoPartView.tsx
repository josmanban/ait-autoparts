'use client';

import {useState, useEffect, useContext} from "react";
import { AutoPartShow } from "@/src/models/AutoPartShow";
import useAutoPart from "@/src/hooks/useAutoPart";
import GlobalContext from "@/src/contexts/GlobalContext";
import { TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
 } from "@mui/material";

export default function AutoPartView(props:{
    code: string;
}){
    const { getAutoPart } = useAutoPart();
    const [autopart, setAutopart] = useState<AutoPartShow | null>(null);
    const { setToastProps } = useContext(GlobalContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data =  await getAutoPart(props.code as string);
                setAutopart(data);
            }catch(error){
                setToastProps({
                    open: true,
                    message: "Error fetching autopart",
                    severity: "error",
                    setProps: setToastProps
                });                
            }
        }
        if(props.code){
            fetchData();
        }
    }, [props.code]);

    return(
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginTop: 2 }}>
                <Table  size="small" aria-label="autopart details">
                    <TableHead>
                        <TableRow><TableCell>Code</TableCell><TableCell>{autopart?.code}</TableCell></TableRow>
                    </TableHead>
                    <TableBody>                        
                        <TableRow><TableCell>Name</TableCell><TableCell>{autopart?.name}</TableCell></TableRow>
                        <TableRow><TableCell>Description</TableCell><TableCell>{autopart?.description}</TableCell></TableRow>
                        <TableRow><TableCell>Stock</TableCell><TableCell>{autopart?.stock}</TableCell></TableRow>
                        <TableRow><TableCell>Min Stock</TableCell><TableCell>{autopart?.min_stock}</TableCell></TableRow>
                        <TableRow><TableCell>Unit Price</TableCell><TableCell>{autopart?.unit_price}</TableCell></TableRow>
                        <TableRow><TableCell>Category</TableCell><TableCell>{autopart?.category.name}</TableCell></TableRow>
                        <TableRow><TableCell>Brand</TableCell><TableCell>{autopart?.brand.name}</TableCell></TableRow>
                        <TableRow><TableCell>Provider</TableCell><TableCell>{autopart?.provider.name}</TableCell></TableRow>
                        <TableRow><TableCell>Storage Location</TableCell><TableCell>{autopart?.storage_location}</TableCell></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           
        </>
    );
}