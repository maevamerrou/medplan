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
            let ordered = JSON.parse(JSON.stringify(res.data))
            ordered.sort((a, b)=> moment(a.time) - moment(b.time)) 
            console.log (ordered)
            this.setState({
            appointments: ordered           
            }, ()=> console.log(this.state.appointments))
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

                        let dateApp = moment(appointment.time).local().format('Do MMM YYYY')
                        let timeApp =  moment(appointment.time).local().format('HH:mm')
                        let timeToApp
                        (appointment.time > Date.now()) ? timeToApp=moment(appointment.time).local().toNow(): timeToApp=moment(appointment.time).local().fromNow()

                        return (
                            <div className="main-content appointment-card">  

                            <div>
                                <p>On: {dateApp} at {timeApp}, {timeToApp}</p>

                                <p>With <strong>Dr. {appointment.doctor.username}</strong></p>
                                <p><strong>Specialized in: </strong>{appointment.doctor.speciality}</p>
                                <p><strong>Purpose: </strong>{appointment.reason}</p>
                                <p><strong>Located at: </strong>{appointment.doctor.address}</p>
                            </div>

                                {         
                                    moment(appointment.time).isBefore(Date.now()) ? (
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
