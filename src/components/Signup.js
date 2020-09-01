import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Signup extends Component {



    render() {
        return (
            <>
                <h1>Sign Up</h1>

                <form onSubmit={this.props.onSignUp} className="sign-log-form">


                    <div>
                        <label for="usertype">I am a </label> 
                        <select className="button" name="usertype">
                            <option className="user-type-choice" value="patient">Patient</option> 
                            <option className="user-type-choice" value="doctor">Doctor</option>                            
                        </select>


                    </div>


                    <br/>

                    
                    <label>Full name</label>
                    <input name="username" type="text"></input>

                    <label>Email</label>
                    <input name="email" type="email"></input>

                    <label>Password</label>
                    <input name="password" type="password"></input>


                    {/* <label>Allergies</label>
                    <input name="allergies" type="text"></input>

                    <label>Medical history</label>
                    <input name="history" type="text"></input> */}

{/* add condition to render different forms for patient and doctor and update the server routes as well */}


                    <div className="sign-log-btn-line">
                        <button className="button" type="submit">Submit</button>
                        <Link to="/login"><button className="button">Or Log In!</button></Link>
                    </div>
                    

                </form>

            </>
        )
    }
}

