import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeDispenses, editDispense } from '../redux/actions';

class Table extends Component {
  delExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(removeDispenses(id));
  };

  editExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(editDispense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table border="1px">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody id="expenses-tbody">
          {expenses.map(({
            description,
            value,
            method,
            tag,
            currency,
            exchangeRates,
            id,
          }) => (
            <tr key={ id } id={ `expense-${id}` }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(Number(exchangeRates[currency].ask) * Number(value)).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <div className="container_buttons_table">
                  <button
                    id="delete-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.delExpenses(id) }
                  >
                    Excluir
                  </button>

                  <button
                    id="edit-btn"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpenses(id) }
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
