import { useState, useEffect } from "react"
import CustomComboBox from "../customComboBox/customComboBox"
import useCategory from "@/src/hooks/useCategory"
import {Category} from "@/src/models/Category";
import { SelectChangeEvent } from "@mui/material";

function CategoryComboBox(
    props: {
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
        selectedValue: string | number | undefined;
        hasEmptyOption?: boolean;
        name:string;
        id:string;
        error?: boolean;
        helperText?: string;
        getOptionValue?: (option: Category) => string | number;    
    }
){

    const { listCategories } = useCategory();
    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await listCategories();
            setCategories(categories);
        };
        fetchData();
    }, []);


    return (
        <CustomComboBox<Category>
            options={categories}
            getOptionLabel={(option: Category) => option.name}
            getValue={props.getOptionValue || ((option: Category) => option.id)}
            handleChange={props.handleChange}
            selectedValue={props.selectedValue}
            label="Category"
            hasEmptyOption={props.hasEmptyOption}
            name={props.name}
            id={props.id}
            error={props.error}
            helperText={props.helperText}
        />
    )
}

CategoryComboBox.prototype = {};

export default CategoryComboBox;