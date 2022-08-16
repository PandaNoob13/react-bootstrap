import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import AppRouter from '../../navigation/AppRouter'
import { setupStore } from "../../shared/state/store"
describe('App Router', () => {
    test('Should show login view page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter/>
            </MemoryRouter>
        )
        const userNameLabel = screen.getByText('User Name');
        expect(userNameLabel).toBeInTheDocument();
        const passwordLabel = screen.getByText('Password');
        expect(passwordLabel).toBeInTheDocument();
        const buttonLoginLabel = screen.getByText('Login');
        expect(buttonLoginLabel).toBeInTheDocument();
    })
    test('Should show view page not found when path is unknown', () => {
        render(
            <MemoryRouter initialEntries={['/dummy']}>
                <AppRouter/>
            </MemoryRouter>
        )
        const errorLabelElem = screen.getByText(/Oopss/);
        expect(errorLabelElem).toBeInTheDocument();
    })
    test('Should show product view page', () => {
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: 'dummy'}
            })}>
                <MemoryRouter initialEntries={['/main/product']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>

        )
        const productLabelElem = screen.getByText('Product');
        expect(productLabelElem).toBeInTheDocument();
    })
    test('Should redirect to login when you wish upon a star', () => {
        render(
            <Provider store={setupStore({
                userInfoReducer: {name: ''}
            })}>
                <MemoryRouter initialEntries={['/main']}>
                    <AppRouter/>
                </MemoryRouter>
            </Provider>
        )
        const userNameLabelElem = screen.getByText('User Name');
        expect(userNameLabelElem).toBeInTheDocument();
    })
})