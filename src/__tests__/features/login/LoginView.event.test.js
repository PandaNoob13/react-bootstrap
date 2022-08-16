import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginView from "../../../features/Login/LoginView";
import { MemoryRouter } from "react-router-dom";
import { UnauthorizedError } from "../../../shared/errors/AppError";
import { APP_NAVIGATION } from "../../../shared/constants";

const mockOnLogin = jest.fn();
const mockUseNavigate = jest.fn();
jest.mock('../../../shared/hook/useAuth', () => ({
    useAuth: () => mockOnLogin()
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Login View Event Test', () => {
    test('Should show error when username or password is empty', () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn()
        })
        render(<LoginView />);
        const buttonLoginElem = screen.getByText('Login');
        fireEvent.click(buttonLoginElem);
        const errorLabelElem = screen.getByText(/Please Input/i);
        expect(errorLabelElem).toBeInTheDocument();
    });

    test('Should show error unauthorized when response onLogin is false', () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockResolvedValue(false)
        })
        render(<LoginView />);
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'dummy user'}});
        fireEvent.change(passwordElem, {target: {value: 'dummy password'}})
        const buttonLoginElem = screen.getByText('Login');
        fireEvent.click(buttonLoginElem);
        waitFor(() => {
            const errorLabelElem = screen.getByText(/unauthorized/i);
            expect(errorLabelElem).toBeInTheDocument();
        })
    });

    test('Should show error unauthorized when response onLogin is throw in error', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockRejectedValue(new UnauthorizedError)
        })
        render(<MemoryRouter>
            <LoginView />
        </MemoryRouter>);
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'dummy user'}});
        fireEvent.change(passwordElem, {target: {value: 'dummy password'}})
        const buttonLoginElem = screen.getByText('Login');
        fireEvent.click(buttonLoginElem);
        await waitFor(() => {
            const errorLabelElem = screen.getByText(/unauthorized/i);
            expect(errorLabelElem).toBeInTheDocument();
        });
    });

    test('Should navigate when login is success', async () => {
        mockOnLogin.mockReturnValue({
            onLogin: jest.fn().mockResolvedValue(true)
        })
        render(<MemoryRouter>
            <LoginView />
        </MemoryRouter>);
        const userNameElem = screen.getByLabelText(/User Name/);
        const passwordElem = screen.getByLabelText(/Password/);
        fireEvent.change(userNameElem, {target: {value: 'dummy user'}});
        fireEvent.change(passwordElem, {target: {value: 'dummy password'}})
        const buttonLoginElem = screen.getByText('Login');
        fireEvent.click(buttonLoginElem);
        await waitFor(() => {
            expect(mockUseNavigate).toHaveBeenCalledWith(APP_NAVIGATION.MAIN, {replace: true})
        });
    })
});