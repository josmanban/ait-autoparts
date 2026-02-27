'use client'

import Link from '@mui/material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';


export default function SideMenu(){
    const {push} = useRouter();
    return (
        <List>            
            <ListItem key={1} disablePadding>
              <ListItemButton>                  
                <Link
                    color="inherit"
                    underline="none"
                    href="#"                      
                    onClick={(e) => {
                      e.preventDefault();
                      push("/create-autopart");
                    }}
                    >
                      <span>Crearte Autopart</span>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key={3} disablePadding>
              <ListItemButton>                  
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