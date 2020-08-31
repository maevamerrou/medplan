import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class SideBar extends Component {

    render() {

        if (this.props.usertype === "patient"){
            return (
                <>    
                    <nav>
                        <ul>
                            <li><Link to="/">Search for a doctor</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/appointments">Appointments</Link></li>
                            <li><Link to="/medication-planner">Medication planner</Link></li>                                  
                        </ul>
                        <button onClick={this.props.onLogout} className="button">LOG OUT</button>
                    </nav>                   
                </>
            )


        } else if (this.props.usertype === "doctor"){
            return (
                <>
                    <nav>
                        <ul>
                            <li><Link to="/calendar">Calendar</Link></li>
                            <li><Link to="/doctor/private">Profile</Link></li>
                            <li><Link to="/">Search for a doctor</Link></li>
                        </ul>
                        <button onClick={this.props.onLogout} className="button">LOG OUT</button>  
                    </nav>                   
                </>                
            )

            
        } else if (!this.props.loggedInUser){
            return (
                <>
                    <nav>                    
                        <Link to="/signup"><button className="button">SIGN UP</button></Link>
                        <Link to="/login"><button className="button">LOG IN</button></Link>                    
                    </nav>  
                </>
            )
        } else {
            return null
        }
    }
}




