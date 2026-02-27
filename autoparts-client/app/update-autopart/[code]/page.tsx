'use client';
import {useState, useEffect} from "react";
import AutopartSaveForm from "@/src/components/autopartSaveForm/AutopartSaveForm";
import useAutoPart from "@/src/hooks/useAutoPart";
import { AutoPart } from "@/src/models/AutoPart";
import HttpError from "@/src/services/HttpError";
import { useContext } from "react";
import GlobalContext from "@/src/contexts/GlobalContext";
import { Typography } from "@mui/material";
import { useParams } from 'next/navigation';

export default function UpdateAutopart(
){
    const params = useParams();
    const {code} = params;
    const { getAutoPart } = useAutoPart();
    const [autopart, setAutopart] = useState<AutoPart | null>(null);

    const { setToastProps } = useContext(GlobalContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data =  await getAutoPart(code as string);
                const auxAutoPart = {
                    ...data,
                    category: data.category?.id,
                    provider: data.provider?.id,
                    brand: data.brand?.id
                }
                setAutopart(auxAutoPart);
            }catch(error){
                if(error instanceof HttpError){
                    setToastProps({
                        open: true,
                        message: `Error fetching autopart: ${error.message}`,
                        severity: "error",
                        setProps: setToastProps
                    });
                }else{
                    setToastProps({
                        open: true,
                        message: `Unexpected error fetching autopart`,
                        severity: "error",
                        setProps: setToastProps
                    });
                }
            }
        }
        if(code){
            fetchData();
        }
    }, [code]);

    return(
    <>
        <Typography variant="h5">Update Autopart {code} </Typography>
        {autopart && <AutopartSaveForm initialData={autopart}/>}
    </>
    );
}