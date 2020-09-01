import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Signup extends Component {
    state={
        passwordStrength: '',
        displayError: true
    }

    
    

    


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
                    <input onChange={this.props.onClear} name="username" type="text"></input>

                    <label>Email</label>
                    <input onChange={this.props.onClear} name="email" type="email"></input>

                    <label>Password</label>
                    <small>Password needs to be at least 8 characters, and include both lower and upper cases, numbers and special signs.</small>
                    <input onChange={this.props.onPass} name="password" type="password"></input>
                    <small>{this.props.passwordStrength}</small>

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


                <p>{this.props.errorMsg}</p>

            </>
        )
    }
}

