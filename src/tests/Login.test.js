import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('Testes para a página de Login', () => {
  it('Testa a validação dos campos de input de e-mail e senha quando corretos', () => {
    renderWithRouterAndRedux(<App />);
    const emailTesteTrue = 'teste@teste.com';
    const senhaTesteTrue = '123456';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEnviar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailTesteTrue);
    userEvent.type(passwordInput, senhaTesteTrue);
    expect(btnEnviar).toBeEnabled();
  });

  it('Testa a validação dos campos de input de e-mail e senha quando corretos', () => {
    renderWithRouterAndRedux(<App />);
    const wrongEmail = 'emailInvalido';
    const wrongPassword = '2154';

    const inputEmail = screen.getByTestId(emailTestId);
    const inputPassword = screen.getByTestId(passwordTestId);
    const sendBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, wrongEmail);
    userEvent.type(inputPassword, wrongPassword);
    expect(sendBtn).toBeDisabled();
  });

  it('Verifica o comportamento do botão de Entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const testEmail = 'teste@gmail.com';
    const testPassword = '123456';

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEnviar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    expect(btnEnviar).toBeEnabled();

    userEvent.click(btnEnviar);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/teste@gmail\.com/i)).toBeInTheDocument();
  });
});
