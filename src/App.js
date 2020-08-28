import React from 'react';
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import PatientProfile from './components/PatientProfile'
import PatientAppointments from './components/PatientAppointments'
import PatientMedPlanner from './components/PatientMedPlanner'
import DoctorCalendar from './components/DoctorCalendar'


import './App.css';
import {API_URL} from './config'
import axios from 'axios'

import {Switch, Route, withRouter} from 'react-router-dom'



class App extends React.Component {

  state = {
    loggedInUser: null,
    usertype: null
  }



  componentDidMount(){
    if (!this.state.loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
      .then((res) => {
          this.setState({
            loggedInUser: res.data.loggedInUser,
            usertype: res.data.usertype
          })
      })
    } 
  }




  handleSignUp = (e) => {
    e.preventDefault();
    console.log("signing up")
    const {email, password, usertype, allergies, history, username} = e.currentTarget;

    axios.post(`${API_URL}/auth/signup`, {
      username: username.value,
      email: email.value,
      password: password.value,
      usertype: usertype.value,
      // allergies: allergies.value,
      // history: history.value
      // to check if withCredentials is needed and state change
    })
    // ,  {withCredentials: true}
      .then((res) => {
        this.props.history.push('/login')
      })
  }

  
  handleLogIn = (e) => {
    e.preventDefault(); 
    const {email, password, usertype} = e.currentTarget;
    console.log(email.value, password.value, usertype.value)
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
    //{withCredentials: true} is not false ???
    axios.post(`${API_URL}/auth/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null,
          usertype: null,
        }, ()=>{
          this.props.history.push('/')
        })
      })    
  }





  render() {
    return (
      <div className="body">
             

        <NavBar />
                
        {/* add condition to render only if logged in */}
        <SideBar loggedInUser= {this.state.loggedInUser} onLogout={this.handleLogOut}/>


        <Switch>


          <Route exact path="/" render={() => {
            return <HomePage  doctorList1={this.state.doctorList} />
          }} />

          {/* <Route exact path="/" /> */}
          <Route path="/signup" render={() => {
            return <Signup onSignUp={this.handleSignUp}/>
          }}/>

          <Route path="/login" render={() => {
            return <Login onLogIn={this.handleLogIn}/>
          }}/>

          <Route path="/profile" render={(routeProps) => {
            return <PatientProfile loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
          }}/>

          <Route path="/appointments" render={(routeProps) => {
            return <PatientAppointments loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
          }}/>

          <Route path="/medication-planner" render={(routeProps) => {
            return <PatientMedPlanner loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
          }}/>

          <Route path="/calendar" render={(routeProps) => {
            return <DoctorCalendar loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
          }}/>


        </Switch>

    </div>
    )
  }
}



export default withRouter(App);
