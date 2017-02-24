import React, { PropTypes } from 'react'
import * as auth from 'utils/auth'
import classNames from 'classnames';

class LoginForm extends React.Component {
  constructor () {
    super()
    this.login = this.login.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.toggleShowPassword = this.toggleShowPassword.bind(this)
    this.toggleShowPasswordStatus = this.toggleShowPasswordStatus.bind(this)
    this.state = {
      showPasswordStatus: false
    }
  }

  login () {
    const userName = this.refs['userName'].value
    const password = this.password.value
    auth.login(
      userName,
      password,
      this.props.onLoginSuccess,
      this.props.onLoginFailure
    )
  }

  hideError () {
    this.refs['invalidCredentials'].style.display = 'none'
  }

  showError () {
    this.refs['invalidCredentials'].style.display = 'block'
  }

  getUserName () {
    return this.refs['userName'].value
  }

  onKeyUp (e) {
    if (e.keyCode === 13) {
      this.props.onEnter(e)
    }
  }

  toggleShowPasswordStatus(){
    this.setState((prevState) => {
      this.toggleShowPassword(!prevState.showPasswordStatus)
      return {
        showPasswordStatus: !prevState.showPasswordStatus
      }
    })
  }
  toggleShowPassword (passwordStatus){
    if(passwordStatus) {
      this.password.type = 'text'
    } else {
      this.password.type = 'password'
    }
  }

  render () {
    let classNameForEye = classNames({
      'fa fa-eye': !this.state.showPasswordStatus,
      'fa fa-eye-slash' : this.state.showPasswordStatus
      // 'active': this.state.showPasswordStatus
    })
    return (
      <div className="text-center">
        <div className="display-inline group">
          <i className="mdi mdi-human-male"></i>
          <input
            autoComplete="off"
            className="form-control"
            ref="userName"
            type="text"
            required
            disabled={this.props.isSubmitting}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Username</label>
        </div>
        <div className="display-inline group">
          <i className="mdi mdi-human-male"></i>
          <input
            className="form-control"
            ref={c => this.password = c}
            type="password"
            required
            disabled={this.props.isSubmitting}
            onKeyUp={this.onKeyUp}
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Password</label>
            <i
              onClick={this.toggleShowPasswordStatus}
              className={classNameForEye}
              aria-hidden="true" />
        </div>
        {
        // <div className="display-inline group"
        //   onClick={this.toggleShowPasswordStatus}>
        //   <input
        //     ref={(c) => this.showPassword = c}
        //     type="checkbox"
        //     checked={this.state.showPasswordStatus}
        //     />
        //   <span className="input-text-div" />
        //   <span>Show password</span>
        // </div>
        }
        {
          // <div>
          //   <input
          //     disabled={this.props.isSubmitting}
          //     type="checkbox"
          //     />
          //   <span>Keep me signed in</span>
          // </div>
          // <div>
          //   <span>Forgot password</span>
          // </div>
        }
        <div>
          <p
            ref='invalidCredentials'
            className='text-danger text-center'
            hidden
            >
            Please check the credentials entered
          </p>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  isSubmitting: PropTypes.bool,
  onLoginSuccess: PropTypes.func,
  onLoginFailure: PropTypes.func,
  onEnter: PropTypes.func
}
export default LoginForm
