import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeDispenses, editDispense } from '../redux/actions';
import '../style/Card.css';

class Card extends Component {
  delExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(removeDispenses(id));
  };

  editExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(editDispense(id));

    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const {
      expenses,
    } = this.props;
    return (
      <section className="container_card">
        {expenses.map(({
          description,
          value,
          method,
          tag,
          currency,
          exchangeRates,
          id,
        }) => (
          <div key={ id } id={ `expense-${id}` } className="card">
            <p>{`Descrição: ${description}`}</p>
            <p>{`Tag: ${tag}`}</p>
            <p>{`Método: ${method}`}</p>
            <p>{`Valor: ${Number(value).toFixed(2)}`}</p>
            <p>{`Moeda: ${exchangeRates[currency].name}`}</p>
            <p>{`Câmbio utilizado: ${Number(exchangeRates[currency].ask).toFixed(2)}`}</p>
            <p>
              {`Valor convertido: 
            ${(Number(exchangeRates[currency].ask) * Number(value)).toFixed(2)}`}
            </p>
            <p>Moeda de conversão: Real</p>
            <div>
              <div className="container_buttons_card">
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
            </div>
          </div>))}

      </section>
    );
  }
}

Card.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Card);
