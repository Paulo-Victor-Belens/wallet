import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { salveDispense,
  walletCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
    valueEdit: '',
    descriptionEdit: '',
    currencyEdit: '',
    methodEdit: '',
    tagEdit: '',
    currenciesResults: [],
  };

  componentDidMount() {
    this.currencies();
  }

  componentDidUpdate(prevProps) {
    const { valueEdit, descriptionEdit,
      currencyEdit, methodEdit,
      tagEdit, editor } = this.props;

    if (editor !== prevProps.editor) {
      this.setState({
        valueEdit,
        descriptionEdit,
        currencyEdit,
        methodEdit,
        tagEdit,
      });
    }
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  currencies = async () => {
    const { dispatch } = this.props;

    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    const dataArray = Object.keys(data);

    const arrayWithoutUSDT = [];

    dataArray.forEach((currencie) => {
      if (currencie !== 'USDT') {
        arrayWithoutUSDT.push(currencie);
      }
    });

    dispatch(walletCurrencies(arrayWithoutUSDT));

    this.setState({
      currenciesResults: arrayWithoutUSDT,
    });
  };

  saveDispenses = async () => {
    const { dispatch } = this.props;
    const {
      value, description, currency,
      method,
      tag,
    } = this.state;

    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();

    const newDispense = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(salveDispense(newDispense));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  saveEditExpense = () => {
    const {
      valueEdit: value,
      descriptionEdit: description,
      currencyEdit: currency,
      methodEdit: method,
      tagEdit: tag,

    } = this.state;
    const { dispatch } = this.props;
    dispatch(salveDispense({
      value,
      description,
      currency,
      method,
      tag,
    }));
  };

  render() {
    const {
      value, description,
      currency, currenciesResults,
      method, tag,
      valueEdit, descriptionEdit,
      currencyEdit, methodEdit,
      tagEdit,

    } = this.state;
    const {
      editor,
    } = this.props;
    return (
      <section className="expenses_forms">

        <form>

          <Input
            type="number"
            test="value-input"
            name={ editor ? 'valueEdit' : 'value' }
            placeholder="Digite um valor"
            value={ editor ? valueEdit : value }
            onChange={ this.handlerChange }
          />

          <Input
            type="text"
            test="description-input"
            name={ editor ? 'descriptionEdit' : 'description' }
            placeholder="Digite uma descrição"
            value={ editor ? descriptionEdit : description }
            onChange={ this.handlerChange }
          />

          <select
            data-testid="currency-input"
            value={ editor ? currencyEdit : currency }
            name={ editor ? 'currencyEdit' : 'currency' }
            onChange={ this.handlerChange }
          >
            {currenciesResults.map((currencie, index) => (
              <option key={ index }>{currencie}</option>
            ))}
          </select>

          <select
            data-testid="method-input"
            name={ editor ? 'methodEdit' : 'method' }
            value={ editor ? methodEdit : method }
            onChange={ this.handlerChange }
          >
            <option name="money" value="Dinheiro">Dinheiro</option>
            <option name="credCard" value="Cartão de crédito">Cartão de crédito</option>
            <option name="debCard" value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            name={ editor ? 'tagEdit' : 'tag' }
            value={ editor ? tagEdit : tag }
            onChange={ this.handlerChange }
          >
            <option name="food" value="Alimentação">Alimentação</option>
            <option name="leisure" value="Lazer">Lazer</option>
            <option name="joob" value="Trabalho">Trabalho</option>
            <option name="transportation" value="Transporte">Transporte</option>
            <option name="health" value="Saúde">Saúde</option>
          </select>
          {editor ? (
            <button
              type="button"
              onClick={ this.saveEditExpense }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.saveDispenses }
            >
              Adicionar despesa
            </button>
          )}
        </form>

      </section>

    );
  }
}

const mapStateToProps = (globalState) => {
  const { editor, idToEdit, expenses } = globalState.wallet;
  let editorExpense = {};
  if (editor) {
    editorExpense = expenses.find((expense) => expense.id === idToEdit);
  }
  return {
    idToEdit,
    editor,
    valueEdit: editorExpense.value,
    descriptionEdit: editorExpense.description,
    currencyEdit: editorExpense.currency,
    methodEdit: editorExpense.method,
    tagEdit: editorExpense.tag,
    expenses,
  };
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  valueEdit: PropTypes.string.isRequired,
  descriptionEdit: PropTypes.string.isRequired,
  currencyEdit: PropTypes.string.isRequired,
  methodEdit: PropTypes.string.isRequired,
  tagEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
