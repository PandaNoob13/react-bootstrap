import { fireEvent, render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { setupStore } from "../../shared/state/store"
import { MemoryRouter } from "react-router-dom"
import AppRouter from '../../navigation/AppRouter'



const mockUseProduct = jest.fn();
jest.mock('../../features/Product/UseProduct', () => (() => mockUseProduct()))
describe('Navigation', () => {
    test('Should show product view with some data', async () => {
        mockUseProduct.mockReturnValue({
            viewState: {
                isLoading: false,
                data: [
                    {
                        id: '1',
                        productName: 'dummy product',
                        productInfo: 'dummy info'
                    }
                ],
                error: null
            }
        });
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: 'dummy'}
            })}>
                <MemoryRouter initialEntries={['/main']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const productButtonElem = screen.getByText('Product');
        expect(productButtonElem).toBeInTheDocument();
        fireEvent.click(productButtonElem)
        await waitFor(() => {
            const result = screen.getByText('dummy product');
            expect(result).toBeInTheDocument();
        })
    })
})