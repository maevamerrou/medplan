import React, { Component } from 'react'
import {API_URL} from '../config'
import axios from 'axios'
import {Link} from 'react-router-dom'

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



    deleteAppointment = (e) => {
        e.preventDefault();
        console.log("delete event")


    }



    
    handleLogOut = (e) => {
        axios.delete(`${API_URL}/patient/appointments/:doctorId/:eventId`, {withCredentials: true})
        .then((res) => {
            this.setState({
                appointments: res.data,
            })
        })    
    }


    // router.delete('/patient/appointments/:doctorId/:eventId', isPatient, (req, res)=>{
    // AppointmentModel.findOneAndRemove({eventId: req.params.eventId})
    //     .then((appo)=>{res.status(200).json(appo)})
    //     .catch((err) => {
    //     res.status(500).json({
    //         error: 'Something went wrong',
    //         message: err
    //     })
    //     })
    // })


    render() {


        if (!this.state.appointments){
            return <p>loading...</p>
        }

        return (
            <>

                <h2>Appointments of {this.state.loggedInUser.username}</h2>

                {

                    this.state.appointments.map(appointment => {
                        return (
                            <div className="appointment-card">                    
                                <p>Date: {appointment.time}</p>
                                <p>Reason: {appointment.reason}</p>
                                <p>Doctor Name: Dr. {appointment.doctor.username}</p>
                                <p>Doctor Speciality: {appointment.doctor.speciality}</p>
                                <p>Address: {appointment.doctor.address}</p>


{/* 
                                {
                                    if (moment(appointment.date).isBefore(new Date())){
                                        return <button onClick={this.deleteAppointment}>Cancel Appointment</button>
                                    } else {
                                        <Link to="/myfile.pdf" target="_blank" download><button>See Report</button></Link>
                                    }                            

                                } */}

                                                              


                            </div>
                        )                      
                    })

                }    


            </>
        )
    }
}
