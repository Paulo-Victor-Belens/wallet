import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { userEmail } from '../redux/actions';
import carteira from '../assets/imagens/login/carteira_login.svg';
import eyeOpen from '../assets/imagens/login/eye-solid.svg';
import eyeClose from '../assets/imagens/login/eye-slash-solid.svg';
import '../style/Login.css';

class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isDisabled: true,
    isChecked: false,
  };

  componentDidMount() {
    this.verifyInputs();
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const { inputEmail, inputPassword } = this.state;

    const minNumber = 6;
    const verifyPassword = inputPassword.length >= minNumber;

    const verifyEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(inputEmail);

    this.setState({
      isDisabled: !(verifyPassword && verifyEmail),
    });
  };

  handlerLogin = () => {
    const { inputEmail } = this.state;
    const { dispatch, history } = this.props;

    dispatch(userEmail(inputEmail));
    history.push('/carteira');
  };

  togglePasswordVisiblity = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  render() {
    const { inputEmail, inputPassword, isDisabled, isChecked } = this.state;

    return (
      <main>
        <section className="login_container">
          <div className="login_information">
            <h1 id="title_login">Login</h1>
            <div className="inputs_login_conatiner">
              <Input
                id="input_email"
                type="email"
                name="inputEmail"
                placeholder="Digite seu email"
                value={ inputEmail }
                onChange={ this.handlerChange }
                test="email-input"
              />
              <div className="container_password_toggle">
                <Input
                  id="input_password"
                  type={ isChecked ? 'text' : 'password' }
                  name="inputPassword"
                  placeholder="Digite sua senha"
                  value={ inputPassword }
                  onChange={ this.handlerChange }
                  test="password-input"
                />
                <button
                  type="button"
                  id="toggle_password"
                  onClick={ this.togglePasswordVisiblity }
                >
                  <img src={ !isChecked ? eyeOpen : eyeClose } alt="Olho aberto" />
                </button>
              </div>
            </div>
            <button
              id="btn_login"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handlerLogin }
            >
              Entrar
            </button>
          </div>
          <div className="login_image">
            <div className="container_login_image">
              <img src={ carteira } alt="imagem do login" className="img_login" />
            </div>
            <div>
              <p>
                Faça login e comece a usar!
              </p>
              <p>
                Digite um email válido, e uma senha com no minímo 6 caracteres.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
