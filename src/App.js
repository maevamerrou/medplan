import React from 'react';
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'


import './App.css';
import {API_URL} from './config'
import axios from 'axios'

import {Switch, Route, withRouter} from 'react-router-dom'



class App extends React.Component {

  state = {
    loggedInUser: null,
    usertype: null,
    filtered: []
  }

  
  componentDidMount(){
    axios.get(`${API_URL}/...`)
      .then((res) => {
          this.setState({
            loggedInUser: res.data
          })
      })
    if (!this.state.loggedInUser){
      axios.get(`${API_URL}/...`, {withCredentials: true})
      .then((res) => {
          this.setState({
            loggedInUser: res.data
          })
      })
    }  
  }

  



  handleSignUp = (e) => {
    e.preventDefault();
    const {email, password, usertype, allergies, history} = e.currentTarget;

    axios.post(`${API_URL}/auth/signup`, {
      email: email.value, 
      password: password.value,
      usertype: usertype.value,
      allergies: allergies.value,
      history: history.value
    },  {withCredentials: true})
      .then((res) => {

        // to be confirmed
        this.setState({
          loggedInUser: res.data,
          usertype: usertype.value,
        }, () => {
          // redirect
          this.props.history.push('/')
        })
      })  
  }

  
  handleLogIn = (e) => {
    e.preventDefault(); 
    const {email, password, usertype} = e.currentTarget;
  
    axios.post(`${API_URL}/auth/login`, {
      email: email.value, 
      password: password.value,
      usertype: usertype.value
    },  {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data,
          usertype: usertype.value,
        }, () => {
          // redirect
          this.props.history.push('/')
        })
      })  
  }



  handleLogOut = (e) => {
    axios.post(`${API_URL}/auth/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/')
        })
      })
    
  }


  handleSearch = (e) => {

  }





  render() {
    return (
      <div>
             

        <NavBar />
                
        {/* add condition to render only if logged in */}
        <SideBar loggedInUser= {this.state.loggedInUser} onLogout={this.handleLogOut}/>


        <Switch>

          <Route exact path="/" render={() => {
            return <HomePage/>
          }} />

          {/* <Route exact path="/" /> */}
          <Route path="/signup" render={() => {
            return <Signup onSignUp={this.handleSignUp}/>
          }}/>

          <Route path="/login" render={() => {
            return <Login onLogIn={this.handleLogIn}/>
          }}/>

        </Switch>

    </div>
    )
  }
}



export default withRouter(App);
