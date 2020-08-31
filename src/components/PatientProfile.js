import React, { Component } from 'react'
import Login from "./Login"

export default class PatientProfile extends Component {

    render() {
        return (
            <>
                {
                    !this.props.loggedInUser ? (

                        <Login />

                    ) : (

                        <>

                            <h1>Profile</h1>
                    
                            <label>Full Name</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.username}</p>

                            <label>Birth Date</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.birthDate}</p>

                            <label>Height</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.height}</p>

                            <label>Weight</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.weight}</p>

                            <label>Allergies</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.allergies}</p>

                            <label>Medical History</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.history}</p>

                            <label>Phone number</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.phoneNumber}</p>

                            <label>Address</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.address}</p>

                            <label>Email</label>
                            <p>{this.props.loggedInUser && this.props.loggedInUser.email}</p>

                            {/* <label>Password</label>
                            <p>********</p> */}

                        </>


                    )
                    
                }

                
            </>
        )
    }
}
