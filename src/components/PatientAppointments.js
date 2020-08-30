import React, { Component } from 'react'
import {API_URL} from '../config'
import axios from 'axios'

export default class PatientAppointments extends Component {


    state = {
        loggedInUser: this.props.loggedInUser,
        usertype: this.props.usertype,
    }

  
    componentDidMount(){
        axios.get(`${API_URL}/patient/appointments` , {withCredentials: true})
        .then((res) => {
            console.log(res)
            this.setState({
            appointments: res.data,
            })
        })
    }



    render() {

        if (!this.state.appointments){
            return <p>loading...</p>
        }


        return (
            <>

                <h1>Appointments of {this.state.loggedInUser.username}</h1>

                {

                    this.state.appointments.map(appointment => {
                        return (
                            <>                    
                                <p>Date: {appointment.time}</p>
                                <p>Appointment type: {appointment.reason}</p>
                                <p>Doctor: {appointment.doctor.username}</p>
                                <p>Time: {appointment.time}</p>
                                <p>Address: </p>
                                <p>See report: {appointment.report}</p>
                                <p>See prescription: {appointment.prescription}</p>                    
                            </>
                        )                      
                    })

                }    


            </>
        )
    }
}
