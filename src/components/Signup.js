import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Signup extends Component {
    state={
        passwordStrength: ''
    }

    
    handlePass=(e)=>{
        let strength = 0
        let lowerCase = new RegExp (/^(?=.*[a-z])/)
        let upperCase = new RegExp (/(?=.*[A-Z])/)
        let number = new RegExp (/(?=.*[0-9])/)
        let especial = new RegExp (/(?=.*[!@#$%^&*])/)  
        let amount = new RegExp (/(?=.{8,})/)
        
        let password= e.currentTarget.value
        if (lowerCase.test(password)) {strength++}
        if (upperCase.test(password)) {strength++}
        if (number.test(password)) {strength++}
        if (especial.test(password)) {strength++}
        if (amount.test(password)) {strength++}
        
        if (strength===0) this.setState({passwordStrength: ''})
        if (strength<3 && strength>0) this.setState({passwordStrength: 'Your password is too weak.'})
        if (strength<5 && strength>=3) this.setState({passwordStrength: 'Almost there, you just need to increase your password strength a little more.'})
        if (strength>=5) this.setState({passwordStrength: 'Your password is good to go!'})

    }


    render() {
        return (
            <>
                <h1>Sign Up</h1>

                <form onSubmit={this.props.onSignUp} className="main-content sign-log-form">


                    <div className="user-type-choice">
                        <label for="usertype">I am a </label> 
                        <select className="button" name="usertype">
                            <option className="user-type-choice" value="patient">Patient</option> 
                            <option className="user-type-choice" value="doctor">Doctor</option>                            
                        </select>
                    </div>



                    
                    <label className="login-label">Full name</label>
                    <input name="username" type="text"></input>

                    <label className="login-label">Email</label>
                    <input name="email" type="email"></input>

                    <label className="login-label">Password</label>
                    <em><small>Password needs to be at least 8 characters, and include both lower and upper cases, numbers and special signs.</small></em>
                    <input onChange={this.handlePass} name="password" type="password"></input>
                    <small>{this.state.passwordStrength}</small>


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

