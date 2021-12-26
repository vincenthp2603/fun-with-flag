import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Container } from 'react-bootstrap';
import MainAppWrapper from './components/HigherOrderComponents/MainAppWrapper/MainAppWrapper';
import Navigation from './components/Navigation/Navigation';
import MobileNavigation from './components/MobileNavigation/mobileNavigation';
import Backdrop from './components/Backdrop/backdrop';
import Flagpedia from './pages/flagpedia/flagpedia';
import AuthPage from './pages/auth/authPage';
import FlagQuiz from './pages/flagquiz/flagquiz';
import SettingPage from './pages/settings/settingPage';
import Page404 from './pages/404Page/404Page';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout, authSuccess } from './redux/actions/auth';
import { getFlagResult } from './redux/actions/flagpedia';

class App extends Component {

  state = {
    showMobileNav: false
  }

  componentDidMount() {
    this.tryAutoLogin();
  }

  tryAutoLogin() {
    let token = localStorage.getItem('token');
    let expiresIn = new Date(parseInt(localStorage.getItem('expiresIn'))).getTime();

    let now = (new Date()).getTime();
    if (token &&  now < expiresIn) {
      console.log('Autologin!');
      let remainTime = expiresIn - now;
      console.log(`${remainTime} ms remain.`);
      setTimeout(() => this.props.logout(), remainTime); 
      let username = localStorage.getItem('username');
      let country = localStorage.getItem('country');
      this.props.login(username, country, token);
      this.props.getFlagResult(country);
    }
  }

  toggleMobileNav() {
    this.setState(prevState => {
      return {
        ...prevState,
        showMobileNav: !prevState.showMobileNav
      }
    })
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <MobileNavigation
            isAuth={this.props.isAuth}
            show={this.state.showMobileNav}
            authHandler={() => this.props.logout()}
            toggleMobileNav={() => this.toggleMobileNav()}
          />
          <Backdrop
            show={this.state.showMobileNav}
            onBackdropClick={() => this.toggleMobileNav()}
          />

          <Navigation
            isAuth={this.props.isAuth}
            authHandler={() => this.props.logout()}
            toggleMobileNav={() => this.toggleMobileNav()}
          />

          <MainAppWrapper>
            <Switch>
              
              <Route path="/" exact>
                <Container fluid>
                  <Flagpedia />
                </Container>
              </Route>
              
              <Route path="/quiz" exact>
                <Container fluid>
                  <FlagQuiz scrollUpRef={this.scrollUpRef} />
                </Container>
              </Route>

              <Route path="/user-info" exact>
                <Container fluid>
                  <SettingPage />
                </Container>
              </Route>
              
              <Route path="/auth" exact>
                <Container fluid>
                  <AuthPage />
                </Container>
              </Route>
              
              <Route path="/">
                <Container fluid>
                  <Page404 />
                </Container>
              </Route>
              
            </Switch>
          </MainAppWrapper>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authLogout()),
    login: (username, country, token) => dispatch(authSuccess(username, country, token)),
    getFlagResult: (country) => dispatch(getFlagResult(country))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
