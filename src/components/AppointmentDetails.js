import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import { Link } from 'react-router-dom'
import moment from 'moment';


export default class AppointmentDetails extends Component {
  state={

  }

  componentDidMount(){
    axios.get(`${API_URL}/doctor/appointment/${this.props.match.params.appointmentId}`, {withCredentials: true})
    .then((res)=>this.setState({appointment: res.data}, ()=>console.log (this.state.appointment)))

  }

  cancelAppointment=(appointment)=>{
    if (window.confirm(`Are you sure you want to cancel the appointment?`)){
      axios.delete(`${API_URL}/cancel/${this.props.match.params.appointmentId}`, {withCredentials:true})
      .then(()=>this.props.history.push('/calendar'))
    }
  }

  toggleLoader=(e)=>{
    e.classList.toggle('hidden-button')
  }

  loadReport=(e)=>{
    let image = e.getElementsByTagName('INPUT')[0].files[0]
    let uploadData = new FormData()
    uploadData.append('imageUrl', image)
    axios.post(`${API_URL}/upload`, uploadData)
      .then((res)=> {console.log(res.data);axios.patch(`${API_URL}/append-report/${this.props.match.params.appointmentId}`, {report: res.data.image}, {withCredentials:true})})
      .then(()=>{
      this.toggleLoader(e)
      window.location.reload()
    })
    
  }


  render() {

    if (!this.state.appointment){
      return <img src="../images/loader.gif" alt="loader"/>
  }
  const{username, phoneNumber, email, allergies, history} = this.state.appointment.patient
  const {time, reason} = this.state.appointment

  let dateApp = moment(time).local().format('Do MMM YYYY')
  let timeApp =  moment(time).local().format('HH:mm')
  let timeToApp
  (time > Date.now())? timeToApp=moment(time).local().toNow(): timeToApp=moment(time).local().fromNow()

    return (
      <>

        <h1> Appointment Details</h1>

        <div className="main-content appointment-details-card">
          
          <div className="top-card-app-details">
            <p>On: {dateApp} at {timeApp}, {timeToApp}</p>
            <p>Reason: {reason}</p>
          </div>

          <div className="bottom-card-app-details">
            <div>
              <h3>Patient information</h3>
              <p>Name: {username}</p>
              <p>Phone: {phoneNumber}</p>
              <p>Email: {email}</p>
              <p>Allergies: {allergies}</p>
              <p>Medical History: {history}</p>  
            </div>

            <div className="btn-app-details">
            {!(this.state.appointment.prescription)? 
              <Link to={`/create-prescription/${this.props.match.params.appointmentId}`}><button className="myButton">Create Prescription</button></Link>
              :<button disabled className="myButton disabled">Prescription added</button>}
            
              
              
              {moment(this.state.appointment.time)>moment(Date.now())?
              <button className="myButton" onClick={()=>this.cancelAppointment(this.props.match.params.appointmentId)}>Cancel appointment</button>: <button disabled className="myButton disabled" onClick={()=>this.cancelAppointment(this.props.match.params.appointmentId)}>Cancel appointment</button>}
            </div>
          </div>

          <div className="report-upload">
            <button className="myButton" onClick={()=>this.toggleLoader(document.getElementById('report-group'))}>{this.state.appointment.report? 'Replace Report':'Upload Report'}</button>

            <div className='hidden-button' id='report-group'>
              <input type='file' name='report' className="form-control"/>
              <button className="myButton" onClick={()=>this.loadReport(document.getElementById('report-group'))}>Submit</button>
            </div>

            {/* {(this.state.appointment.prescription)? <p>There is already a prescription associated to this appointment.</p>:null} */}

          </div>
                      
      </div>


      </>
    )
  }
}
