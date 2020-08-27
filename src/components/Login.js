import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import NavBar from './NavBar'



export default class Login extends Component {


    render() {
        return (
            <>

                <NavBar />
                <h1>Login</h1>

                <form onSubmit={this.props.onLogIn} class="sign-log-form">


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

                    <button class="button" type="submit">Submit</button>
                    <Link to="/signup"><button class="button">No account yet? Then sign up!</button></Link>

                </form>

                
            </>
        )
    }
}
