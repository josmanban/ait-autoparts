'use client';
import { Typography } from "@mui/material";
import AutoPartList from "@/src/components/autopartList/AutoPartList";

export default function ListAutopartsPage(){
    return (
        <>
        <Typography variant="h4" gutterBottom>
            List Autoparts
        </Typography>
        <AutoPartList />
        </>
    );
}