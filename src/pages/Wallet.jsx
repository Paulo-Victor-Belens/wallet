import React, { Component } from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../style/Wallet_Header.css';
import '../style/Wallet_Form.css';
import '../style/Wallet_Table.css';
import '../style/Scroll_Bar.css';
import Card from '../components/Card';

class Wallet extends Component {
  render() {
    return (
      <section className="container_wallet">
        <div className="container_header_informations">
          <Header />
          <WalletForm />
        </div>
        <div className="container_table">
          <Table />
          <Card />
        </div>
      </section>
    );
  }
}

export default Wallet;
