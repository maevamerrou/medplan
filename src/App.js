import React from 'react';
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import PatientProfile from './components/PatientProfile'
import PatientAppointments from './components/PatientAppointments'
import PatientMedPlanner from './components/PatientMedPlanner'
import DoctorProfile from './components/DoctorProfile'
import DoctorCalendar from './components/DoctorCalendar'
import AppointmentDetails from './components/AppointmentDetails'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {API_URL} from './config'
import axios from 'axios'

import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import CreatePrescription from './components/CreatePrescription';



class App extends React.Component {

  state = {
    loggedInUser: null,
    usertype: null,
    errorMsg:'',
    desiredUrl: null,
    passwordStrength: ''
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
    const {email, password, usertype, username} = e.currentTarget;

    axios.post(`${API_URL}/auth/signup`, {
      username: username.value,
      email: email.value,
      password: password.value,
      usertype: usertype.value,
      // allergies: allergies.value,
      // history: history.value
      // to check if withCredentials is needed and state change
    })
      .then((res) => {
        this.props.history.push('/login')
      })
      .catch(err=>{
        this.setState({
          errorMsg: err.response.data.errorMessage
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
          errorMsg: null
        }, () => {       
          if (this.state.usertype === "patient"){
            if (window.location.pathname.includes('doctor')){
              this.props.history.push(window.location.pathname)
            } 
            else if (!window.location.pathname.includes('doctor')) (this.props.history.push('/profile'))
          } 
          else if (this.state.usertype === "doctor"){
            this.props.history.push(`/doctor/${this.state.loggedInUser._id}`)
          }
        })
      })
      .catch(err=>{
        this.setState({
          errorMsg: err.response.data.error
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
          desiredUrl: null
        }, ()=>{
          this.props.history.push('/')
        })
      })    
  }

  handlePass=(e)=>{
    let strength = 0
    let lowerCase = new RegExp (/^(?=.*[a-z])/)
    let upperCase = new RegExp (/(?=.*[A-Z])/)
    let number = new RegExp (/(?=.*[0-9])/)
    let especial = new RegExp (/(?=.*[!@#$%^&*])/)  
    let amount = new RegExp (/(?=.{8,})/)
    
    let password= e.currentTarget.value
    if (lowerCase.test(password)) {strength++}
    if (upperCase.test(password)) {strength++}
    if (number.test(password)) {strength++}
    if (especial.test(password)) {strength++}
    if (amount.test(password)) {strength++}
    
    if (strength===0) this.setState({passwordStrength: ''})
    if (strength<3 && strength>0) this.setState({passwordStrength: 'Your password is too weak.'})
    if (strength<5 && strength>=3) this.setState({passwordStrength: 'Almost there, you just need to increase your password strength a little more.'})
    if (strength>=5) this.setState({passwordStrength: 'Your password is good to go!'})

    if (e.currentTarget.value==='') this.setState({errorMsg: ''})
  }

  clearError=(e)=>{
    if (e.currentTarget.value==='') this.setState({errorMsg: ''})
  }



  render() {
    return (

      <div className="body">

                
        {/* add condition to render only if logged in */}
        <NavBar loggedInUser= {this.state.loggedInUser} usertype= {this.state.usertype} onLogout={this.handleLogOut}/>     

        <Switch>

          {/* Public routes */}
          <Route exact path="/" render={() => <HomePage  doctorList1={this.state.doctorList}/>}/>      


          {/* Routes for logged out users */}
          {(!this.state.loggedInUser) ?
            <>
              <Route path="/login" render={() => <Login errorMsg={this.state.errorMsg} onClear={this.clearError} onLogIn={this.handleLogIn}/>}/> 
              <Route path="/signup" render={() => <Signup onPass={this.handlePass} passwordStrength={this.state.passwordStrength} onClear={this.clearError} errorMsg={this.state.errorMsg} onSignUp={this.handleSignUp}/>}/>
              <Route path="/doctor/:doctorId" render={routeProps=> <Login onClear={this.clearError} errorMsg={this.state.errorMsg} onLogIn={this.handleLogIn}/>}/>
            </>
            : null}
          

          {/* Routes for doctors */}
          {(this.state.usertype==='doctor')?
            <>
              <Route exact path="/calendar" render={(routeProps) => {
                return <DoctorCalendar loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }}/>
              <Route path="/calendar/:appointmentId" render={(routeProps) => {
                return <AppointmentDetails loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }}/>
              <Route path="/doctor/:doctorId" render={routeProps=> <DoctorProfile loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }/>
              <Route path="/create-prescription/:appointmentId" render={routeProps=> <CreatePrescription loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }/>
            </>
            :null}

 
          {/* Routes for patients */}
          {(this.state.usertype==='patient')?
            <>
              <Route path="/profile" render={(routeProps) => {
                return <PatientProfile loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }}/>

              <Route path="/appointments" render={(routeProps) => {
                return <PatientAppointments loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }}/>

              <Route path="/medication-planner" render={(routeProps) => {
                return <PatientMedPlanner loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
              }}/>
              
              <Route path="/doctor/:doctorId" render={routeProps=> <DoctorProfile loggedInUser={this.state.loggedInUser} usertype={this.state.usertype} {...routeProps}/>
            }/>
            </>
            : null }
        
           
        </Switch>

        <Footer />

      
      
      </div>
    )
  }
}



export default withRouter(App);