import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
// import Wallet from '../pages/Wallet';

const inputTestId = 'value-input';
const totalTestId = 'total-field';

describe('Testes para a página Wallet', () => {
  const initialEntries = ['/carteira'];

  const expenseExample1 = {
    value: '100',
    currency: 'USD',
    method: 'Cartão de débito',
    tag: 'Transporte',
    description: 'Dez dólares',
    exchangeRates: mockData,
  };
  const expenseExample2 = {
    value: '200',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Transporte',
    description: 'Dez dólares',
    exchangeRates: mockData,
  };
  const expenseExample3 = {
    value: '300',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    description: 'Um dólar',
    exchangeRates: mockData,
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica os elementos presentes na página', () => {
    const initialState = { user: { email: 'teste@gmail.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const email = screen.getByText(/teste@gmail\.com/i);
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const currencies = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const btnAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(email).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(currencies).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
  });

  it('Verifica se o Header calcula de forma correta o valor total das despesas', () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2, expenseExample3],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(screen.getByTestId('total-field')).toHaveTextContent('2851.86');
  });

  it('Verifica se uma despesa é editada quando se clica no botão editar', async () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2, expenseExample3],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnEditar = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(btnEditar[0]);

    const valueInput = screen.getByTestId(inputTestId);
    userEvent.type(valueInput, '0');
    expect(valueInput).toHaveValue(1000);
    const btnSendEdition = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(btnSendEdition);
    expect(screen.getByTestId(totalTestId)).toHaveTextContent('14259.30');
    expect(valueInput).toHaveTextContent('');
  });

  it('Verifica se quando apertado botão de deletar, a despesa some da tela', () => {
    const initialState = {
      wallet: {
        expenses: [expenseExample1, expenseExample2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnExcluir = screen.getAllByRole('button', {
      name: /excluir/i,
    });
    userEvent.click(btnExcluir[0]);
    expect(screen.getByTestId(totalTestId)).toHaveTextContent('0.00');
  });
  it('Verifica se os inputs são limpos', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    const input = screen.getByTestId(inputTestId);
    const descriptionInput = screen.getByTestId('description-input');
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.type(input, '10');
    userEvent.type(descriptionInput, 'teste');
    userEvent.click(btnAddExpense);
    expect(input).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');
  });
  // it('Verifica se o select possui 15 opções', () => {
  //   const initialState = {
  //     wallet: {
  //       expenses: [],
  //       currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
  //       editor: false,
  //       idToEdit: 0,
  //     },
  //   };
  //   renderWithRouterAndRedux(<Wallet />, { initialState, initialEntries });
  //   const selectElement = screen.getByTestId('currency-input');
  //   const options = selectElement.querySelectorAll('option');

  //   expect(options.length).toBe(15);
  // });
});
