'use client';
import { Typography } from "@mui/material";
import useAutoPart from "@/src/hooks/useAutoPart";
import {Button, FormControl, styled} from "@mui/material";
import { useState } from "react";
import { AutoPartImportResponse } from "@/src/services/AutoPartService";
import HttpError from "@/src/services/HttpError";
import GlobalContext from "@/src/contexts/GlobalContext";
import { useContext } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { ListItem, ListItemText, List, Grid }  from '@mui/material';
import { BorderColor } from "@mui/icons-material";


// Create a visually hidden input component
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImportAutoparts(){
    const { importAutoParts } = useAutoPart();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { setToastProps } = useContext(GlobalContext);

    const [importResponse, setImportResponse] = useState<AutoPartImportResponse | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
        }
    };

    const handleImport = async () => {
        if(!file) return;
        setLoading(true);
        try{
            const response = await importAutoParts(file);
            setImportResponse(response);
            if(response.fail){
                setToastProps({ open: true, message: 'Some records failed to import', severity: 'warning' });
            } else {
                setToastProps({ open: true, message: 'Autoparts imported successfully', severity: 'success' });
            }
        } catch (error) {
            if (error instanceof HttpError) {
                setImportResponse({
                    count: 0,
                    fail: true,
                    errors: error.body.errors,
                    globals: error.body.global_errors,
                });
            } else {
                setImportResponse(null);
            }
            setToastProps({ open: true, message: 'Error importing autoparts', severity: 'error' });
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Typography variant="h5">Import autoparts from csv file</Typography>

            <Grid container spacing={2}>
            <form onSubmit={(e) => { e.preventDefault(); handleImport(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <FormControl>
                    <Button 
                        variant="contained" 
                        component="label" 
                        disabled={loading} 
                        tabIndex={-1} role={undefined} 
                        startIcon={<CloudUploadIcon />}>
                        Upload CSV file
                        <VisuallyHiddenInput 
                            type="file" 
                            onChange={handleFileChange}
                            multiple={false}
                            name="file"
                            accept=".csv"/>
                    </Button>                    
                </FormControl>
                <FormControl>
                    {file && <Typography variant="body1" sx={{ mt: 1 }}>{file.name}</Typography>}
                </FormControl>
                <FormControl>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        disabled={!file || loading} 
                        sx={{ mt: 2 }}>
                        {loading ? 'Importing...' : 'Import'}
                    </Button>
                </FormControl>
            </form>
            </Grid>
            {importResponse && (
                <Card sx={{ mt: 2 }}>
                    <CardHeader title="Import Result" />
                    <CardContent>
                        <Typography>Total records processed: {importResponse.count}</Typography>
                        {importResponse.errors && (
                            <>
                                <Typography variant="h6" color="error">Errors:</Typography>

                                <List>
                                    {Object.entries(importResponse.errors).map(([key, value]) => (
                                        <ListItem key={key}>
                                            <ListItemText>
                                                <Typography variant="subtitle1">Record {key}:</Typography>
                                                {Object.entries(value).map(([field, errors]) => (
                                                    <Typography key={field} variant="body2" color="error">
                                                        {field}: {(errors as string[]).join(', ')}
                                                    </Typography>
                                                ))}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                        {importResponse.globals && (
                            <>
                                <Typography variant="h6" color="error">Global Errors:</Typography>
                                <List>
                                    {importResponse.globals.map((error, index) => (
                                        <ListItem key={index}>
                                            <ListItemText>
                                                <Typography variant="body2" color="error">
                                                    {error}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </>
    );
}