'use strict';

const categories = [
{
    "id": 1,
    "name": "Motor" 
},
{
    "id": 2,
    "name": "Transmision" 
},
{
    "id": 3,
    "name": "Frenos" 
},
{
    "id": 4,
    "name": "Suspension" 
},
{
    "id": 5,
    "name": "Electricos" 
}];

export default function CategoryService() {
    const listCategories = async (): Promise<typeof categories> => {
        return Promise.resolve(categories);
    }

    return {
        listCategories
    };
};