import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LoginForm from './LoginForm.react'
import { withRouter } from 'react-router'
// import core from './loginView.less'

@withRouter
class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false,
      mode: 'LOGIN'
    }
    this.formsubmit = this.formsubmit.bind(this)
    this.onLoggedIn = this.onLoggedIn.bind(this)
    this.onLoginFailed = this.onLoginFailed.bind(this)
    this.setMode = this.setMode.bind(this)
    this.toggleSubmitting = this.toggleSubmitting.bind(this)
  }
  formsubmit(e) {
    e.preventDefault()
    if (!this.state.isSubmitting) {
      switch (this.state.mode) {
        case 'LOGIN':
          this.refs['loginForm'].hideError()
          this.toggleSubmitting()
          this.refs['loginForm'].login()
          break
      }
    }
  }
  onLoggedIn(response) {
    console.log('Lovinview', response)
    this.toggleSubmitting()
    const access_token = response.accessToken
    document.cookie = 'access_token=' + access_token
    document.cookie = 'phone_number=' + this.refs['loginForm'].getUserName()
    this.props.router.push('/home')
  }
  onLoginFailed(response) {
    this.toggleSubmitting()
    this.refs.loginForm.showError()
  }
  setMode(e) {
    e.preventDefault()
    const mode = e.currentTarget.textContent
    console.log('Login mode ', mode)
    switch (mode) {
      case 'Sign in':
        if (this.state.mode !== 'LOGIN') {
          this.setState({
            mode: 'LOGIN'
          })
        }
        break
      case 'Sign up':
        if (this.state.mode !== 'SIGNUP') {
          this.setState({
            mode: 'SIGNUP'
          })
        }
        break
    }
  }
  toggleSubmitting() {
    this.setState({
      isSubmitting: !this.state.isSubmitting
    })
  }

  renderLoginItems() {
    if (this.state.mode === 'LOGIN') {
      return (
        <LoginForm
          ref="loginForm"
          isSubmitting={this.state.isSubmitting}
          onLoginSuccess={this.onLoggedIn}
          onLoginFailure={this.onLoginFailed}
          onEnter={this.formsubmit}
          />
      )
    }
  }
  render() {
    const signInClass = classNames(
      'login-mode',
    )
    const signUpClass = classNames(
      'login-mode',
    )
    const buttonClass = this.state.isSubmitting ? 'login-progress send-button' : 'send-button'
    const renderLoginItems = this.renderLoginItems()
    return (
      <div className='login-view center-block'>
        <div className='header-strip text-center'>
          <div className="app-title">
            <img
              draggable={false}
              className="img-responsive vcenter logo"
              src={'/images/ae_logo.png'}
              />
            <h4 className="vcenter">Adaptive Engine</h4>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className={signInClass} onClick={this.setMode}>
                Sign in
              </div>
            </div>
          </div>
          {renderLoginItems}
          <div
            className={buttonClass}
            ref="login"
            onClick={this.formsubmit}
            >
            <img className="send-icon" src={'/images/login-send.png'} />
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
