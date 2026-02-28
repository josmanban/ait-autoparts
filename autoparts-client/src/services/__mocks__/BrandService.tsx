'use strict';

const brands = [
{
    "id": 1,
    "name": "Toyota"
}
,{
    "id": 2,
    "name": "Ford"
}
,
{
    "id": 3,
    "name": "Honda"
}
,
{
    "id": 4,
    "name": "Chevrolet"
}
,
{
    "id": 5,
    "name": "Nissan"
}
];

export default function BrandService() {
    const listBrands = async (): Promise<typeof brands> => {
        return Promise.resolve(brands);
    }

    return {
        listBrands
    };
};