import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const HomeRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-page-bg-container">
      <nav className="home-page-navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>

      <div className="home-page-content-card">
        <h1 className="home-page-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default withRouter(HomeRoute)
