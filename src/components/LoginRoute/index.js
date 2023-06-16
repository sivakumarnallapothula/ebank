import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', pin: '', errorText: '', isErrorOccurred: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  setCookies = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, pin} = this.state
    console.log(username)
    console.log(pin)
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: username, pin}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setCookies(data.jwt_token)
    } else {
      const data = await response.json()
      this.setState({isErrorOccurred: true, errorText: data.error_msg})
    }
  }

  render() {
    const {username, pin, isErrorOccurred, errorText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-bg-container">
        <div className="login-form-bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="username-input-container">
              <label className="label" htmlFor="username">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="username"
                value={username}
                placeholder="Enter User ID"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="password-input-container">
              <label className="label" htmlFor="password">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="password"
                value={pin}
                placeholder="Enter PIN"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isErrorOccurred && <p className="error-message">{errorText}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
