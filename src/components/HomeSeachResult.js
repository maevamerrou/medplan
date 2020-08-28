import React, { Component } from 'react'
// import {Link} from 'react-router-dom'



export default class HomeSeachResult extends Component {
    render() {
        return (


            <div className="home-result-card">

                {
                    this.props.doctorList.map((doctor) => {
                        return  <div className="home-doctor-card">

                                <p>{doctor.username}</p>
                                <p>{doctor.speciality}</p>
                                <p>{doctor.email}</p>
                                <p>{doctor.city}</p>

                                {/* Add link to doctor page */}
                                {/* <Link to={`/doctor/${doctor._id}`}> */}
                                <button className="button">Book an appointment</button>
                                {/* </Link> */}

                            </div>
                    })
                }

            </div>

                
        )
    }
}
