import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AutoPartList from '@/src/components/autopartList/AutoPartList';

// mock the hook so we use the manual mock defined in __mocks__
jest.mock('@/src/hooks/useAutoPart');
jest.mock('@/src/services/CategoryService');

// mock the useRouter hook to prevent errors related to Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            query: {},
        };
    },
}));

describe('AutoPartList Component', () => {
    test('renders AutoPartList component with correct data and filters', async () => {
        render(<AutoPartList />);

        // wait for async state update to complete
        await waitFor(() => expect(screen.getByText('APA-001')).toBeInTheDocument());

        // look fot others items as well
        expect(screen.getByText('APA-002')).toBeInTheDocument();
        expect(screen.getByText('APA-003')).toBeInTheDocument();
        expect(screen.getByText('APA-004')).toBeInTheDocument();
        expect(screen.getByText('APA-005')).toBeInTheDocument();


        // now make all other assertions
        expect(screen.getByText('Code')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Filtro de Aceite')).toBeInTheDocument();
        expect(screen.getByText('Stock')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('Min Stock')).toBeInTheDocument();
        // min-stock value appears more than once (filter placeholder etc.)
        const tenElements = screen.getAllByText('10');
        expect(tenElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Unit Price')).toBeInTheDocument();
        expect(screen.getByText('15.99')).toBeInTheDocument();
        // there are multiple 'Category' labels (filter and table header)
        const categoryElements = screen.getAllByText('Category');
        expect(categoryElements.length).toBeGreaterThanOrEqual(1);

        // 'Motor' may appear multiple times (filter label, table content)
        const motorElements = screen.getAllByText('Motor');
        expect(motorElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Brand')).toBeInTheDocument();
        // 'Toyota' could also appear more than once (brand filter etc.)
        const toyotaElements = screen.getAllByText('Toyota');
        expect(toyotaElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Provider')).toBeInTheDocument();
        // provider name may appear multiple times
        const proveedorElements = screen.getAllByText('Proveedor A');
        expect(proveedorElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Storage Location')).toBeInTheDocument();
        expect(screen.getByText('AD-12-03')).toBeInTheDocument();


        // get TextField component for search input and check if it is in the document
        const searchTextField = screen.getByRole('textbox', { name: 'Code/Name/Description' });
        expect(searchTextField).toBeInTheDocument();
        
        // set text in the search input and wait for the controlled value to update
        fireEvent.change(searchTextField, { target: { value: 'Suspensión Neumática' } });
        await waitFor(() => expect(screen.getByDisplayValue('Suspensión Neumática')).toBeInTheDocument());

        // get do filter button and check if it is in the document
        const filterButton = screen.getByRole('button', { name: 'Filter' });
        expect(filterButton).toBeInTheDocument();

        // check if the autopart was filtered correctly (only APA-015 should be visible)
        fireEvent.click(filterButton);
        // wait for the filtering to take effect (mock logs show search parameter)
        await waitFor(() => expect(screen.getByText('Suspensión Neumática')).toBeInTheDocument());
        expect(screen.queryByText('APA-001')).not.toBeInTheDocument();
        expect(screen.queryByText('APA-002')).not.toBeInTheDocument();
        expect(screen.queryByText('APA-003')).not.toBeInTheDocument();
        expect(screen.queryByText('APA-004')).not.toBeInTheDocument();
        expect(screen.queryByText('APA-005')).not.toBeInTheDocument();

    });
});

