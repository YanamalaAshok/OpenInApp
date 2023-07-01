import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
        <p className="password-paragraph">Forgot password?</p>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Email address
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <div className="board-container">
          <h1 className="heading">Board.</h1>
        </div>
        <div className="forms-container">
          <h1 className="form-heading">Sign In</h1>
          <p className="form-paragraph">Sign in to your account</p>
          <div className="company-container">
            <div className="google-container">
              <img
                alt="google"
                className="google-img"
                src="https://www.polymtl.ca/calendrier/sites/calendrier.amigow2020.polymtl.ca/files/googlelogo.jpg"
              />
              <p className="google-paragraph">sign in with google</p>
            </div>
            <div className="google-container">
              <img
                alt="google"
                className="google-img"
                src="https://tse1.mm.bing.net/th?id=OIP.CN9GzRUomamhbh-PG6zJmwHaEv&pid=Api&P=0&h=180"
              />
              <p className="google-paragraph">sign in with Apple</p>
            </div>
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Sign In
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
          <div className="register-container">
            <p className="register-paragraph">Dont have an account?</p>
            <p className="register">Register here</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
