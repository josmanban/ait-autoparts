'use strict';
const autoparts = [
  {
    "code": "APA-001",
    "name": "Filtro de Aceite",
    "description": "Filtro de aceite para motores de gasolina.",
    "stock": 50,
    "min_stock": 10,
    "unit_price": "15.99",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "AD-12-03"
  },
  {
    "code": "APA-002",
    "name": "Pastillas de Freno",
    "description": "Juego de pastillas de freno para vehículos compactos.",
    "stock": 30,
    "min_stock": 5,
    "unit_price": "45.50",
    "category": {
      "id": 3,
      "name": "Frenos"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "BB-12-03"
  },
  {
    "code": "APA-003",
    "name": "Amortiguadores",
    "description": "Amortiguadores para suspensión trasera.",
    "stock": 20,
    "min_stock": 5,
    "unit_price": "120.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "CC-12-03"
  },
  {
    "code": "APA-004",
    "name": "Bujías",
    "description": "Juego de bujías para motores de 4 cilindros.",
    "stock": 100,
    "min_stock": 20,
    "unit_price": "8.75",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "DD-12-03"
  },
  {
    "code": "APA-005",
    "name": "Correa de Distribución",
    "description": "Correa de distribución para motores de 6 cilindros.",
    "stock": 15,
    "min_stock": 3,
    "unit_price": "75.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "EE-12-03"
  },
  {
    "code": "APA-006",
    "name": "Radiador",
    "description": "Radiador para sistemas de enfriamiento de vehículos.",
    "stock": 10,
    "min_stock": 2,
    "unit_price": "200.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "FF-12-03"
  },
  {
    "code": "APA-007",
    "name": "Caja de Cambios",
    "description": "Caja de cambios manual para vehículos de pasajeros.",
    "stock": 5,
    "min_stock": 1,
    "unit_price": "500.00",
    "category": {
      "id": 2,
      "name": "Transmision"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "GG-12-03"
  },
  {
    "code": "APA-008",
    "name": "Disco de Freno",
    "description": "Disco de freno ventilado para vehículos deportivos.",
    "stock": 25,
    "min_stock": 5,
    "unit_price": "80.00",
    "category": {
      "id": 3,
      "name": "Frenos"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "HH-12-03"
  },
  {
    "code": "APA-009",
    "name": "Alternador",
    "description": "Alternador para sistemas eléctricos de vehículos.",
    "stock": 8,
    "min_stock": 2,
    "unit_price": "150.00",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "II-12-03"
  },
  {
    "code": "APA-010",
    "name": "Amortiguadores Delanteros",
    "description": "Amortiguadores delanteros para suspensión de vehículos.",
    "stock": 18,
    "min_stock": 4,
    "unit_price": "110.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "JJ-12-03"
  },
  {
    "code": "APA-011",
    "name": "Filtro de Aire",
    "description": "Filtro de aire para motores diésel.",
    "stock": 40,
    "min_stock": 8,
    "unit_price": "20.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "KK-12-03"
  },
  {
    "code": "APA-012",
    "name": "Embrague",
    "description": "Kit de embrague para vehículos de transmisión manual.",
    "stock": 12,
    "min_stock": 3,
    "unit_price": "250.00",
    "category": {
      "id": 2,
      "name": "Transmision"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "LL-12-03"
  },
  {
    "code": "APA-013",
    "name": "Pastillas de Freno Traseras",
    "description": "Juego de pastillas de freno traseras para vehículos compactos.",
    "stock": 35,
    "min_stock": 5,
    "unit_price": "40.00",
    "category": {
      "id": 3,
      "name": "Frenos"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "MM-12-03"
  },
  {
    "code": "APA-014",
    "name": "Bomba de Agua",
    "description": "Bomba de agua para sistemas de enfriamiento de vehículos.",
    "stock": 10,
    "min_stock": 2,
    "unit_price": "90.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "NN-12-03"
  },
  {
    "code": "APA-015",
    "name": "Suspensión Neumática",
    "description": "Sistema de suspensión neumática para vehículos de lujo.",
    "stock": 5,
    "min_stock": 1,
    "unit_price": "800.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "OO-12-03"
  },
  {
    "code": "APA-016",
    "name": "Batería de Vehículo",
    "description": "Batería de 12V para sistemas eléctricos de vehículos.",
    "stock": 22,
    "min_stock": 5,
    "unit_price": "120.00",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "PP-12-03"
  },
  {
    "code": "APA-017",
    "name": "Inyector de Combustible",
    "description": "Inyector de combustible para motores de gasolina.",
    "stock": 16,
    "min_stock": 3,
    "unit_price": "85.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "QQ-12-03"
  },
  {
    "code": "APA-018",
    "name": "Cilindro Maestro de Freno",
    "description": "Cilindro maestro de freno para sistemas hidráulicos.",
    "stock": 9,
    "min_stock": 2,
    "unit_price": "110.00",
    "category": {
      "id": 3,
      "name": "Frenos"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "RR-12-03"
  },
  {
    "code": "APA-019",
    "name": "Bujes de Suspensión",
    "description": "Bujes de goma para suspensión delantera.",
    "stock": 28,
    "min_stock": 6,
    "unit_price": "35.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "SS-12-03"
  },
  {
    "code": "APA-020",
    "name": "Regulador de Voltaje",
    "description": "Regulador de voltaje para alternadores de vehículos.",
    "stock": 11,
    "min_stock": 2,
    "unit_price": "65.00",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "TT-12-03"
  },
  {
    "code": "APA-021",
    "name": "Correa de Serpentín",
    "description": "Correa de serpentín para transmisión de potencia.",
    "stock": 33,
    "min_stock": 7,
    "unit_price": "28.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "UU-12-03"
  },
  {
    "code": "APA-022",
    "name": "Válvula Solenoide",
    "description": "Válvula solenoide para sistemas de transmisión.",
    "stock": 14,
    "min_stock": 3,
    "unit_price": "95.00",
    "category": {
      "id": 2,
      "name": "Transmision"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "VV-12-03"
  },
  {
    "code": "APA-023",
    "name": "Pastilla de Freno Cerámica",
    "description": "Pastillas de freno de cerámica de alta durabilidad.",
    "stock": 42,
    "min_stock": 8,
    "unit_price": "55.00",
    "category": {
      "id": 3,
      "name": "Frenos"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "WW-12-03"
  },
  {
    "code": "APA-024",
    "name": "Rótula de Suspensión",
    "description": "Rótula de suspensión para dirección de vehículos.",
    "stock": 19,
    "min_stock": 4,
    "unit_price": "75.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "XX-12-03"
  },
  {
    "code": "APA-025",
    "name": "Motor de Arranque",
    "description": "Motor de arranque para encendido de vehículos.",
    "stock": 6,
    "min_stock": 1,
    "unit_price": "180.00",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "YY-12-03"
  },
  {
    "code": "APA-026",
    "name": "Termostato",
    "description": "Termostato para control de temperatura de refrigerante.",
    "stock": 27,
    "min_stock": 5,
    "unit_price": "32.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 1,
      "name": "Toyota"
    },
    "provider": {
      "id": 1,
      "name": "Proveedor A"
    },
    "storage_location": "ZZ-12-03"
  },
  {
    "code": "APA-027",
    "name": "Convertidor Torque",
    "description": "Convertidor de torque para transmisiones automáticas.",
    "stock": 3,
    "min_stock": 1,
    "unit_price": "450.00",
    "category": {
      "id": 2,
      "name": "Transmision"
    },
    "brand": {
      "id": 2,
      "name": "Ford"
    },
    "provider": {
      "id": 2,
      "name": "Proveedor B"
    },
    "storage_location": "AB-12-03"
  },
  {
    "code": "APA-028",
    "name": "Tubo de Escape",
    "description": "Tubo de escape para sistemas de combustión de vehículos.",
    "stock": 13,
    "min_stock": 2,
    "unit_price": "140.00",
    "category": {
      "id": 1,
      "name": "Motor"
    },
    "brand": {
      "id": 3,
      "name": "Honda"
    },
    "provider": {
      "id": 3,
      "name": "Proveedor C"
    },
    "storage_location": "AC-12-03"
  },
  {
    "code": "APA-029",
    "name": "Amortiguador de Vibraciones",
    "description": "Amortiguador de vibraciones para motor y transmisión.",
    "stock": 21,
    "min_stock": 4,
    "unit_price": "65.00",
    "category": {
      "id": 4,
      "name": "Suspension"
    },
    "brand": {
      "id": 4,
      "name": "Chevrolet"
    },
    "provider": {
      "id": 4,
      "name": "Proveedor D"
    },
    "storage_location": "AE-12-03"
  },
  {
    "code": "APA-030",
    "name": "Sensor de Oxígeno",
    "description": "Sensor de oxígeno para control de emisiones de vehículos.",
    "stock": 31,
    "min_stock": 6,
    "unit_price": "55.00",
    "category": {
      "id": 5,
      "name": "Electricos"
    },
    "brand": {
      "id": 5,
      "name": "Nissan"
    },
    "provider": {
      "id": 5,
      "name": "Proveedor E"
    },
    "storage_location": "AF-12-03"
  }
];

export default function AutoPartService() {
    const listAutoParts = async (): Promise<typeof autoparts> => {
        return Promise.resolve(autoparts);
    };

    const getAutoPart = async (code: string) => {
        return Promise.resolve(autoparts.find(a => a.id === code));
    };

    const deleteAutoPart = async (code: string) => {
        const index = autoparts.findIndex(a => a.id === code);
        if(index !== -1){
            autoparts.splice(index, 1);
            return Promise.resolve();
        }else{
            return Promise.reject(new Error("AutoPart not found"));
        }
    };

    const createAutoPart = async (autoPart: any) => {
        autoparts.push(autoPart);
        return Promise.resolve();
    };
    
    const updateAutoPart = async (code: string, autoPart: any) => {
        const index = autoparts.findIndex(a => a.id === code);
        if(index !== -1){
            autoparts[index] = autoPart;
            return Promise.resolve();
        }else{
            return Promise.reject(new Error("AutoPart not found"));
        }
    };

    return {
        listAutoParts,
        getAutoPart,
        deleteAutoPart,
        createAutoPart,
        updateAutoPart
    };
};