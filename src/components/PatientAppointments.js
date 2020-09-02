import React, { Component } from 'react';
import {API_URL} from '../config';
import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';

export default class PatientAppointments extends Component {


    state = {
        loggedInUser: this.props.loggedInUser,
        usertype: this.props.usertype,
        appointments: null,
        report: null,
    }

  

    componentDidMount(){
        axios.get(`${API_URL}/patient/appointments` , {withCredentials: true})
        .then((res) => {
            this.setState({
            appointments: res.data            
            })
        })
    }
    


    
    handleDownload = (e, appointmentId) => {
        e.preventDefault();
        axios.get(`${API_URL}/patient/appointment/report/${appointmentId}`, {withCredentials: true})
        .then((res) => {
            console.log(res.data.report)
            this.setState({
                report: res.data.report,
            })
            window.open(this.state.report, '_blank')

        })    
    }



    render() {


        if (!this.state.appointments){
            return <p>loading...</p>
        }

        return (
            <>

                <h2>Appointments of {this.state.loggedInUser.username}</h2>

                {
                    this.state.appointments.map(appointment => {

                        // get the today date in correct format
                        let today = new Date();
                        {/* let dd = String(today.getDate()).padStart(2, '0');
                        let mm = String(today.getMonth() + 1).padStart(2, '0');
                        let yyyy = today.getFullYear();
                        let newToday = `${dd}/${mm}/${yyyy}`; */}


                        // get the appointment date in correct format
                        let dateApp = moment(appointment.time).local().format('Do MMM YYYY')
                        let timeApp =  moment(appointment.time).local().format('HH:mm')
                        let timeToApp
                        moment(appointment.time)<moment(Date.now())? timeToApp=moment(appointment.time).local().toNow(): timeToApp=moment(appointment.time).local().fromNow()

                        return (
                            <div className="appointment-card">  

                            <div>
                                <p>On: {dateApp} at {timeToApp}, {timeToApp}</p>

                                <p>Purpose: {appointment.reason}</p>
                                <p>With Dr. {appointment.doctor.username}</p>
                                <p>Specialized in: {appointment.doctor.speciality}</p>
                                <p>Located at: {appointment.doctor.address}</p>
                            </div>

                                {         
                                    moment(dateApp, timeApp).isBefore(today) ? (
                                        <Link to={`/doctor/${appointment.doctor._id}`}><button className="button">Edit/Cancel</button></Link>

                                        ) : (appointment.report? 
                                        
                                            <button className="button" onClick={(e) => this.handleDownload(e, appointment._id)}>See Report</button>:
                                            <button className="button disabled" disabled>No Report</button>

                                            )
                                } 

                            </div>
                        )                      
                    })

                }    


            </>
        )
    }
}
