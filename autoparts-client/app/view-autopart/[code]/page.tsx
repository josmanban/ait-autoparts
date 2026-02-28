'use client';

import { Typography } from "@mui/material";
import { useParams } from 'next/navigation';
import AutoPartView from "@/src/components/autopartView/AutoPartView";

export default function ViewAutopartPage(){
    const params = useParams();
    const { code } = params;
    return(
        <div>
            <Typography variant="h4" gutterBottom>
                View Autopart
            </Typography>
            <AutoPartView code={code as string} />
        </div>
    );
}