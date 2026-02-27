import { useState, useEffect } from "react"
import CustomComboBox from "../customComboBox/customComboBox"
import useBrand from "@/src/hooks/useBrand"
import {Brand} from "@/src/models/Brand";
import { SelectChangeEvent } from "@mui/material";

function BrandComboBox(
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

    const { listBrands } = useBrand();
    const [brands, setBrands] = useState<Array<Brand>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const brands = await listBrands();
            setBrands(brands);
        };
        fetchData();
    }, []);


    return (
        <CustomComboBox<Brand>
            options={brands}
            getOptionLabel={(option: Brand) => option.name}
            getValue={(option: Brand) => option.id}
            handleChange={props.handleChange}
            selectedValue={props.selectedValue}
            label="Brand"
            hasEmptyOption={props.hasEmptyOption}
            name={props.name}
            id={props.id}
            error={props.error}
            helperText={props.helperText}
        />
    )
}

BrandComboBox.prototype = {};

export default BrandComboBox;