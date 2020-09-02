import React, { Component } from 'react'
import {Link} from 'react-router-dom'



export default class HomeSeachResult extends Component {
    render() {
        return (


            <div className="main-content">

                {
                    this.props.doctorList.map((doctor) => {
                        return  (
                            <div className="home-doctor-card">

                                <img className="doc-img" src={doctor.picture} alt="profile picture"/>
                                <div className="search-doc-details-text">
                                    <p><strong>{doctor.username}</strong></p>
                                    <p>{doctor.speciality}</p>
                                    <p>Address: <em>{doctor.address}</em></p>
                                    <p>Available from {doctor.openingTime} to {doctor.closingTime}</p>
                                </div>                                

                                <Link to={`/doctor/${doctor._id}`}>
                                <button className="button">Book an appointment</button>
                                </Link>

                            </div>

                        )
                              
                    })
                }

                <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" type="text/javascript"></script>
                
            </div>

                
        )
    }
}
