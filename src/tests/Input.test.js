import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input';

const namePassword = 'password-input';

describe('renders correctly with custom props', () => {
  it('testando o input', () => {
    const props = {
      type: 'password',
      name: 'password',
      id: 'passwordInput',
      placeholder: 'Enter password',
      value: '123456',
      onChange: jest.fn(),
      test: namePassword,
      checked: true,
      disabled: true,
      className: 'custom-class',
      onClick: jest.fn(),
    };

    render(<Input { ...props } />);
    const inputElement = screen.getByTestId(namePassword);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(inputElement).toHaveAttribute('name', 'password');
    expect(inputElement).toHaveAttribute('id', 'passwordInput');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter password');
    expect(inputElement).toHaveValue('123456');
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass('custom-class');

    userEvent.type(inputElement, '7890');
    expect(inputElement).toHaveValue('123456');

    expect(props.onClick).not.toHaveBeenCalled();
  });
});
