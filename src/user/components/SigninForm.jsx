import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../shared/apis/server';
import Cookies from 'universal-cookie';

class SignForm extends React.Component {
  state = { email: '', password: '', isLogedin: false };
  login = async (e) => {
    e.preventDefault();
    const result = await api.post('users/login', {
      email: this.state.email,
      password: this.state.password,
    });
    if (result.status === 200) {
      const cookies = new Cookies();
      cookies.set('jwt', result.data.token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30 * 3,
      });

      // todo change status to logged in
      // todo change location to home
      // todo change picture and unlock acount option
    }
  };
  render() {
    return (
      <div className='sign-form-container'>
        <form className='form' onSubmit={(e) => this.login(e)}>
          <h3 className='heading-3'>login to your acount</h3>
          <label className='form__label' htmlFor='email'>
            Email
          </label>
          <input
            className='form__input'
            type='email'
            name='email'
            autoComplete='email'
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            className='form__input'
            type='password'
            name='password'
            autoComplete='current-password'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            required
          />

          <input className='form__submit' type='submit' value='login' />

          <Link className='form__submit--secondary' to='/forgetPassword'>
            Forgot my password
          </Link>
        </form>
      </div>
    );
  }
}

export default SignForm;
