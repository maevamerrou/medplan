import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import NavBar from './Navbar'


export default class Signup extends Component {


    render() {
        return (
            <>
                <NavBar />

                <h1>Sign Up</h1>

                <form onSubmit={this.props.onSignUp} className="sign-log-form">


                    <div>
                        <label for="usertype">I am a</label><br/>
                        <select name="usertype">
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            
                        </select>
                    </div>
                    <br/>

                    <label>Email</label>
                    <input name="email" type="email"></input>

                    <label>Password</label>
                    <input name="password" type="password"></input>

                    <label>Allergies</label>
                    <input name="allergies" type="text"></input>

                    <label>Medical history</label>
                    <input name="history" type="text"></input>

                    <button class="button" type="submit">Submit</button>
                    <Link to="/login"><button className="button">Already an account? Then log in!</button></Link>

                </form>

            </>
        )
    }
}

