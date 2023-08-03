import userInfos from '../actions-types/actions-types-user';
import walletInfos from '../actions-types/actions-types-wallet';

// Coloque aqui suas actions
export const userEmail = (payload) => ({
  type: userInfos.USER_EMAIL,
  payload,
});

export const walletCurrencies = (payload) => ({
  type: walletInfos.WALLET_CURRENCIES,
  payload,
});

export const salveDispense = (payload, ask) => ({
  type: walletInfos.SAVE_DISPENSE,
  payload,
  ask,
});

export const removeDispenses = (payload) => ({
  type: walletInfos.REMOVE_DISPENSE,
  payload,
});

export const editDispense = (payload) => ({
  type: walletInfos.EDIT_EXPENSE,
  payload,
});
