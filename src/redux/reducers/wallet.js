import walletInfos from '../actions-types/actions-types-wallet';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case walletInfos.WALLET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case walletInfos.SAVE_DISPENSE:
    return {
      ...state,
      expenses: (state.editor ? (
        state.expenses.map((expense) => (expense.id === state.idToEdit
          ? Object.assign(expense, action.payload) : expense))
      ) : (
        [...state.expenses, { ...action.payload, id: state.expenses.length }])),
      editor: false,
    };
  case walletInfos.REMOVE_DISPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case walletInfos.EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return { ...state };
  }
};

export default walletReducer;
