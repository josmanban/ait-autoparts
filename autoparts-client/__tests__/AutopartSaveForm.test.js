import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AutopartSaveForm from '@/src/components/autopartSaveForm/AutopartSaveForm';
import {autoparts} from '@/src/services/__mocks__/AutoPartService';

// mock the hook so we use the manual mock defined in __mocks__
jest.mock('@/src/hooks/useAutoPart');
jest.mock('@/src/services/CategoryService');
jest.mock('@/src/services/BrandService');
jest.mock('@/src/services/ProviderService');

// mock the useRouter hook to prevent errors related to Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            query: {},
        };
    },
}));

// build a proper AutoPart object (service mock uses nested objects)
const raw = autoparts[0]; // first autopart from the mock data
const autopartToEdit = {
    ...raw,
    category: raw.category.id,
    brand: raw.brand.id,
    provider: raw.provider.id,
}; // conforms to AutoPart model

describe('AutopartSaveForm Component', () => {
    test('renders AutopartSaveForm component with correct data for editing', async () => {

        render(<AutopartSaveForm initialData={autopartToEdit} />);
        // wait for async state update to complete
        await waitFor(() => expect(screen.getByDisplayValue('APA-001')).toBeInTheDocument());

        const codeTextField = screen.getByRole('textbox', { name: 'Code' });
        expect(codeTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('APA-001')).toBeInTheDocument());

        // now make all other assertions        
        const nameTextField = screen.getByRole('textbox', { name: 'Name' });
        expect(nameTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('Filtro de Aceite')).toBeInTheDocument());

        const descriptionTextField = screen.getByRole('textbox', { name: 'Description' });
        expect(descriptionTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('Filtro de aceite para motores de gasolina.')).toBeInTheDocument());

        const stockTextField = screen.getByRole('spinbutton', { name: 'Stock' });
        expect(stockTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('50')).toBeInTheDocument());

        const minStockTextField = screen.getByRole('spinbutton', { name: 'Min Stock' });
        expect(minStockTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('10')).toBeInTheDocument());

        const unitPriceTextField = screen.getByRole('spinbutton', { name: 'Unit Price' });
        expect(unitPriceTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('15.99')).toBeInTheDocument());

        const categorySelect = screen.getAllByRole('combobox')[0];
        expect(categorySelect).toBeInTheDocument();
        await waitFor(() => expect(categorySelect).toHaveTextContent('Motor'));

        const brandSelect = screen.getAllByRole('combobox')[2];
        expect(brandSelect).toBeInTheDocument();
        await waitFor(() => expect(brandSelect).toHaveTextContent('Toyota'));

        const providerSelect = screen.getAllByRole('combobox')[1];
        expect(providerSelect).toBeInTheDocument();
        await waitFor(() => expect(providerSelect).toHaveTextContent('Proveedor A'));

        const storageLocationTextField = screen.getByRole('textbox', { name: 'Storage Location' });
        expect(storageLocationTextField).toBeInTheDocument();
        await waitFor(() => expect(screen.getByDisplayValue('AD-12-03')).toBeInTheDocument());
    });
});
