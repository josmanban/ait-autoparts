'use client';
import { Typography } from "@mui/material";
import useAutoPart from "@/src/hooks/useAutoPart";
import {Button} from "@mui/material";
import { useState } from "react";

export default function ExportAutoparts(){
    const { exportAutoParts } = useAutoPart();
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Typography variant="h5">Export autoparts into excel file</Typography>
            <Button 
                variant="contained" 
                color="primary"
                loading={loading}
                onClick={async () => {
                    setLoading(true);
                    const blob = await exportAutoParts();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'autoparts.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    setLoading(false);
                }}
                >Export</Button>
        </>
    );
}