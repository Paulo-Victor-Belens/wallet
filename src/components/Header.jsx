import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import coins from '../assets/imagens/wallet/wallet_header.gif';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const initialValue = 0;
    return (
      <div className="container_cabeçalho">
        <img src={ coins } alt="coins" className="wallet_header_image" />
        <h1 data-testid="email-field" className="email">
          { `Pessoa Usuária: ${email}` }
        </h1>
        <div data-testid="total-field" className="total">
          Total Gasto em BRL: R$&nbsp;
          {expenses.length > 0
            ? expenses
              .reduce((total, expense) => {
                const { value, currency, exchangeRates } = expense;
                total += Number(exchangeRates[currency].ask) * Number(value);
                return total;
              }, 0)
              .toFixed(2)
            : initialValue.toFixed(2)}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
