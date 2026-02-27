'use client';
import { Typography } from "@mui/material";
import AutopartSaveForm from "@/src/components/autopartSaveForm/AutopartSaveForm";
export default function CreateAutopart(){
    return (
        <>
        <Typography variant="h5">Create Autopart</Typography>
        <AutopartSaveForm />
        </>
    );
}