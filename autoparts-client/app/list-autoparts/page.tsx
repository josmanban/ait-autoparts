'use client';
import { Typography } from "@mui/material";
import AutoPartTable from "@/src/components/autopartTable/AutoPartTable";
import AutoPartFilters from "@/src/components/autopartFilters/AutoPartFilters";

import {AutoPartShow} from "@/src/models/AutoPartShow";
import useAutoPart from "@/src/hooks/useAutoPart";
import { useEffect, useState, useContext } from "react";
import GlobalContext from "@/src/contexts/GlobalContext";
import AutoPartPaginator from "@/src/components/autopartPaginator/AutoPartPaginator";
import { AutoPartPaginationResponse } from "@/src/services/AutoPartService";
import { Filters } from "@/src/components/autopartFilters/AutoPartFilters";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRouter } from 'next/navigation';


export default function ListAutoparts(){
    const { listAutoParts, deleteAutoPart } = useAutoPart();
    const { setToastProps } = useContext(GlobalContext);
    const [autoParts, setAutoParts] = useState<Array<AutoPartShow>>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState<number>(0);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedCode, setSelectedCode] = useState<string | null>(null);

    const router = useRouter();


    const handleDelete = (code: string) => {
        setSelectedCode(code);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        setDeleteDialogOpen(false);
        if(selectedCode){
            try{
                await deleteAutoPart(selectedCode);
                setToastProps({
                    message: "Autopart deleted successfully",
                    severity: "success"
                });
                if(currentPage == 1){
                    reloadData();
                }else{
                    setCurrentPage(1);
                }
            }catch(error){
                setToastProps({
                    message: "Error deleting autopart",
                    severity: "error"
                });
            }finally{
                setSelectedCode(null);
            }
        }
    }

    

    const handleEdit = (code: string) => {
        router.push(`/update-autopart/${code}`);
    };

    const handleView = (code: string) => {
        router.push(`/view-autopart/${code}`);
    };

    const reloadData = async () => {
        try{
            const paginationData: AutoPartPaginationResponse = await listAutoParts(
                currentPage,filters.search, filters.categoryName, filters.criticalStock);
            setAutoParts(paginationData.results);
            setTotalItems(paginationData.count);            
        } catch (error) {
            setToastProps({
                message: "Error loading autoparts",
                severity: "error"
            });
        }
    };

    useEffect(() => {
        reloadData();
    }, [currentPage, filters]);

    return (
        <>
            <Typography variant="h5">List Autoparts</Typography>
            <AutoPartFilters onFilter={setFilters}/>
            <AutoPartTable autoParts={autoParts} onDelete={handleDelete} onEdit={handleEdit} onView={handleView}/>
            <AutoPartPaginator
                totalItems={totalItems}
                itemsPerPage={itemsPerPage} 
                currentPage={currentPage}
                onPageChange={setCurrentPage} 
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this autopart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>    
            </Dialog>
        </>
    );
}