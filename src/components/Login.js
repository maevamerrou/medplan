import React, { Component } from 'react'
import {Link} from 'react-router-dom'



export default class Login extends Component {
    


    render() {

        
        return (

            <>

                <h1>Login</h1>

                <form onSubmit={this.props.onLogIn} className="sign-log-form">


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

                    <button className="button" type="submit">Submit</button>
                    <Link to="/signup"><button className="button">Or sign up!</button></Link>

                </form>

                <p>{this.props.errorMsg}</p>

                
            </>
        )
    }
}