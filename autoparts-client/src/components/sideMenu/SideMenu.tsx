'use client'

import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';



export default function SideMenu(){
    const {push} = useRouter();
    return( 
        <List>            
            <ListItem key={1} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <Link
                    color="inherit"
                    underline="none"
                    href="#"                      
                    onClick={(e) => {
                      e.preventDefault();
                      push("/create-autopart");
                    }}
                    >
                      <span>Create Autopart</span>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={3} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>                  
                <Link
                    color="inherit"
                    underline="none"
                    href="#"                      
                    onClick={(e) => {
                      e.preventDefault();
                      push("/list-autoparts");
                    }}
                    >
                      <span>List Autoparts</span>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={4} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>                  
                <Link
                    color="inherit"
                    underline="none"
                    href="#"                      
                    onClick={(e) => {
                      e.preventDefault();
                      push("/export-autoparts");
                    }}
                    >
                      <span>Export Autoparts</span>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={5} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FileDownloadIcon />
                </ListItemIcon>                  
                <Link
                    color="inherit"
                    underline="none"
                    href="#"                      
                    onClick={(e) => {
                      e.preventDefault();
                      push("/import-autoparts");
                    }}
                    >
                      <span>Import Autoparts</span>
                </Link>
              </ListItemButton>
            </ListItem>          
        </List>
    );
}