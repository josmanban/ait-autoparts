'use strict';

const providers = [
{    
    "id": 1,
    "name": "Proveedor A"    
},
{    
    "id": 2,
    "name": "Proveedor B"    
},
{    
    "id": 3,
    "name": "Proveedor C"    
},
{    
    "id": 4,
    "name": "Proveedor D"    
},
{    
    "id": 5,
    "name": "Proveedor E"    
},
];

export default function ProviderService() {
    const listProviders = async (): Promise<typeof providers> => {
        return Promise.resolve(providers);
    }

    return {
        listProviders
    };
};