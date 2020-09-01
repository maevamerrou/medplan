import React, { Component } from 'react'
import {Link} from 'react-router-dom'



export default class Login extends Component {
    


    render() {

        
        return (

            <>

                <h1>Log In</h1>

                <form onSubmit={this.props.onLogIn} className="main-content sign-log-form">


                    <div className="user-type-choice">
                        <label for="usertype">I am a </label>
                        <select className="button" name="usertype">
                            <option className="user-type-choice" value="patient">Patient</option>
                            <option className="user-type-choice" value="doctor">Doctor</option>
                            
                        </select>
                    </div>

                    <label className="login-label">Email</label>
                    <input name="email" type="email"></input>

                    <label className="login-label">Password</label>
                    <input name="password" type="password"></input>

                    <div className="sign-log-btn-line">
                        <button className="button" type="submit">Submit</button>
                        <Link to="/signup"><button className="button">Or Sign Up!</button></Link>
                    </div>

                    

                </form>

                <p>{this.props.errorMsg}</p>

                
            </>
        )
    }
}