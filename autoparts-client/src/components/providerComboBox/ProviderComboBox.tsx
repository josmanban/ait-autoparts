import { useState, useEffect } from "react"
import CustomComboBox from "../customComboBox/customComboBox"
import useProvider from "@/src/hooks/useProvider"
import {Provider} from "@/src/models/Provider";
import { SelectChangeEvent } from "@mui/material";

function ProviderComboBox(
    props: {
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
        selectedValue: string | number | undefined;
        hasEmptyOption?: boolean;
        name:string;
        id:string;
        error?: boolean;
        helperText?: string;
    }
){

    const { listProviders } = useProvider();
    const [providers, setProviders] = useState<Array<Provider>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const providers = await listProviders();
            setProviders(providers);
        };
        fetchData();
    }, []);


    return (
        <CustomComboBox<Provider>
            options={providers}
            getOptionLabel={(option: Provider) => option.name}
            getValue={(option: Provider) => option.id}
            handleChange={props.handleChange}
            selectedValue={props.selectedValue}
            label="Provider"
            hasEmptyOption={props.hasEmptyOption}
            name={props.name}
            id={props.id}
            error={props.error}
            helperText={props.helperText}
        />
    )
}

ProviderComboBox.prototype = {};

export default ProviderComboBox;