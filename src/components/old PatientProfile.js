import React, { Component } from 'react'
import Login from "./Login"

export default class PatientProfile2 extends Component {

    render() {
        return (
            <>
                {
                    !this.props.loggedInUser ? (

                        <Login />

                    ) : (

                        <>

                            <h1>Profile</h1>

                            <em></em>
{/*                     
                            <p><strong>Full Name: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.username}</em></p>
                            

                            <p><strong>Birth Date: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.birthDate}</em></p> */}

                            <p><strong>Height: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.height}</em></p>

                            <p><strong>Weight: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.weight}</em></p>

                            <p><strong>Allergies: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.allergies}</em></p>

                            <p><strong>Medical History: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.history}</em></p>

                            {/* <p><strong>Phone number: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.phoneNumber}</em></p> */}

                            {/* <p><strong>Address: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.address}</em></p> */}

                            {/* <p><strong>Email: </strong><em>{this.props.loggedInUser && this.props.loggedInUser.email}</em></p> */}

                            {/* <label>Password</label>
                            ********</h5> */}

                        </>


                    )
                    
                }

                
            </>
        )
    }
}
