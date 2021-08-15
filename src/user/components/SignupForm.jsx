import React from 'react';
import { api } from '../../shared/apis/server';
import Cookies from 'universal-cookie';

class SignupForm extends React.Component {
  state = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    passwordConfirm: '',
    photo: null,
  };
  signup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('mobile', this.state.mobile);
    formData.append('password', this.state.password);
    formData.append('passwordConfirm', this.state.passwordConfirm);
    formData.append('photo', this.state.photo);

    const result = await api.post('users/signup', formData);
    if (result.status === 201) {
      const cookies = new Cookies();
      cookies.set('jwt', result.data.token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30 * 3,
      });
      this.setState({ name: '' });
      this.setState({ email: '' });
      this.setState({ mobile: '' });
      this.setState({ password: '' });
      this.setState({ passwordConfirm: '' });
    }
    // todo change status to loggedin
    // todo set picture
    // todo login
    // todo change location to '/'
    // todo unlock acount page and acount page options
  };
  render() {
    return (
      <div className='sign-form-container'>
        <form className='form' onSubmit={(e) => this.signup(e)}>
          <h3 className='heading-3'>sign up to create an acount</h3>
          <label className='form__label' htmlFor='name'>
            Name
          </label>
          <input
            className='form__input'
            autoComplete='username'
            type='text'
            name='name'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <label htmlFor='email'>Email</label>
          <input
            className='form__input'
            type='email'
            name='email'
            autoComplete='email'
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <label htmlFor='mobile'>Mobile</label>
          <input
            className='form__input'
            type='phone'
            name='mobile'
            value={this.state.mobile}
            onChange={(e) => this.setState({ mobile: e.target.value })}
          />

          <label htmlFor='password'>Password</label>
          <input
            className='form__input'
            type='password'
            name='password'
            autoComplete='new-password'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <label htmlFor='passwordConfirm'>Confirm Your Password</label>
          <input
            className='form__input'
            type='password'
            name='passwordConfirm'
            autoComplete='new-password'
            value={this.state.passwordConfirm}
            onChange={(e) => this.setState({ passwordConfirm: e.target.value })}
          />

          <label htmlFor='photo'>Upload your profile photo</label>
          <input
            className='form__input'
            type='file'
            accept='images/*'
            name='photo'
            onChange={(e) => {
              this.setState({ photo: e.target.files[0] });
            }}
          />

          <input className='form__submit' type='submit' value='Sign up' />
        </form>
      </div>
    );
  }
}

export default SignupForm;
