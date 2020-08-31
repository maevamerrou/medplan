import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import { Link } from 'react-router-dom'

export default class AppointmentDetails extends Component {
  state={

  }

  componentDidMount(){
    axios.get(`${API_URL}/doctor/appointment/${this.props.match.params.appointmentId}`, {withCredentials: true})
    .then((res)=>this.setState({appointment: res.data}, ()=>console.log (this.state.appointment)))

  }

  cancelAppointment=(appointment)=>{
    if (window.confirm(`Are you sure you want to cancel the appointment?`)){
      axios.delete(`${API_URL}/cancel/${appointment}`, {withCredentials:true})
      .then(()=>this.props.history.push('/calendar'))
    }
  }

  toggleLoader=(e)=>{
    e.classList.toggle('hidden-button')
  }

  loadReport=(e)=>{
    let report = e.getElementsByTagName('INPUT')[0].files[0]
    let uploadData = new FormData()
    uploadData.append('imageUrl', report)
    axios.post(`${API_URL}/upload`, uploadData)
      .then((res)=> {axios.patch(`${API_URL}/doctor/appointment/report/${this.props.match.params.appointmentId}`, {report: res.data.report}, {withCredentials:true})})
      .then(()=>this.toggleLoader(e))
  }


  render() {

    if (!this.state.appointment){
      return <p>Loading ....</p>
  }
  const{username, phoneNumber, email} = this.state.appointment.patient
  const {time, reason} = this.state.appointment
    return (
      <div>
      <h1> Appointment Details</h1>

      <div>
        <h2>Patient information</h2>
        <p>Name: {username}</p>
        <p>Phone: {phoneNumber}</p>
        <p>Email: {email}</p>

      </div>

      <div>
        <h2>Appointment information</h2>
        <p>Time: {time}</p>
        <p>Reason: {reason}</p>
      </div>

      <div>
        
        <button onClick={()=>this.toggleLoader(document.getElementById('report-group'))}>Load Report</button>
        <Link to={`/create-prescription/${this.props.match.params.appointmentId}`}><button>Create Prescription</button></Link>
        <button onClick={()=>this.cancelAppointment(this.props.match.params.appointmentId)}>Cancel appointment</button>
      </div>

      <div className='hidden-button' id='report-group'>
            <button  onClick={()=>this.loadReport(document.getElementById('report-group'))}>Submit</button>
            <input type='file' name='report' className="form-control"/>
      </div>



        
      </div>
    )
  }
}
