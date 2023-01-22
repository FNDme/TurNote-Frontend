import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('displays the login and signup links when he user is not logged in', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('dont display the login and signup links when he user is logged in', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(queryByText('Login')).toBeInTheDocument();
    expect(queryByText('Sign Up')).toBeInTheDocument();
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });

  
});
