import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

// mock the hook so we use the manual mock defined in __mocks__
jest.mock('@/src/hooks/useAutoPart');

import AutoPartView from '@/src/components/autopartView/AutoPartView';

describe('ViewAutopart Component', () => {
    test('renders AutoPartView component with correct data', async () => {
        const mockAutoPart = {
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
        };

        // the mocked hook already returns predefined autoparts from __mocks__,
        // so just render using the first item code (APA-001)
        render(<AutoPartView code={mockAutoPart.code} />);

        // wait for async state update to complete
        await waitFor(() => expect(screen.getByText('APA-001')).toBeInTheDocument());

        // now make all other assertions
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Filtro de Aceite')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Filtro de aceite para motores de gasolina.')).toBeInTheDocument();
        expect(screen.getByText('Stock')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('Min Stock')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('Unit Price')).toBeInTheDocument();
        expect(screen.getByText('15.99')).toBeInTheDocument();
        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('Motor')).toBeInTheDocument();
        expect(screen.getByText('Brand')).toBeInTheDocument();
        expect(screen.getByText('Toyota')).toBeInTheDocument();
        expect(screen.getByText('Provider')).toBeInTheDocument();
        expect(screen.getByText('Proveedor A')).toBeInTheDocument();
        expect(screen.getByText('Storage Location')).toBeInTheDocument();
        expect(screen.getByText('AD-12-03')).toBeInTheDocument();        
    });
});
  