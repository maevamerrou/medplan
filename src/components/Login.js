import React, { Component } from 'react'
import {Link} from 'react-router-dom'



export default class Login extends Component {
    


    render() {

        
        return (

            <>

                <h1>Log In</h1>

                <form onSubmit={this.props.onLogIn} className="main-content sign-log-form">


                    <div className="user-type-choice">
                        <label className="label-user" for="usertype">I am a </label>
                        <select className="myButton" name="usertype">
                            <option className="user-type-choice" value="patient">Patient</option>
                            <option className="user-type-choice" value="doctor">Doctor</option>
                            
                        </select>
                    </div>

                    <label className="login-label">Email</label>
                    <input onChange={this.props.onClear} name="email" type="email"></input>

                    <label className="login-label">Password</label>
                    <input onChange={this.props.onClear} name="password" type="password"></input>

                    <div className="sign-log-btn-line">
                        <button className="myButton" type="submit">Submit</button>
                        <Link to="/signup"><button className="myButton">Or Sign Up!</button></Link>
                    </div>

                    

                </form>

                <p>{this.props.errorMsg}</p>

                
            </>
        )
    }
}