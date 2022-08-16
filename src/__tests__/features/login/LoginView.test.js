import {render, screen} from "@testing-library/react"
import LoginView from "../../../features/Login/LoginView"

const mockUseLogin = jest.fn();
jest.mock('../../../features/Login/UseLogin', () => () => mockUseLogin())
describe('Login View Test', () => {
    test('Should render successfully', () => {
        mockUseLogin.mockReturnValue({
            viewState: '', 
            userCred: '', 
            handleInputChange: jest.fn(), 
            handleLogin: jest.fn()
        })
        render(<LoginView/>);
        const userNameLabel = screen.getByText('User Name');
        expect(userNameLabel).toBeInTheDocument();
        const passwordLabel = screen.getByText('Password');
        expect(passwordLabel).toBeInTheDocument();
        const buttonLoginLabel = screen.getByText('Login');
        expect(buttonLoginLabel).toBeInTheDocument();
    })

    test('Should disable button when state is loading', () => {
        mockUseLogin.mockReturnValue({
            viewState: {isLoading: true, data: null, error: null}, 
            userCred: '', 
            handleInputChange: jest.fn(), 
            handleLogin: jest.fn()
        })
        render(<LoginView/>)
        const buttonLoginLabel = screen.getByText('Login');
        expect(buttonLoginLabel).toBeDisabled();
    })
})