import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class SideBar extends Component {


    render() {
        return (
            <div>
                <nav>                

                    {
                        this.props.loggedInUser  ? (

                        <>                        
                            <ul>
                                <li><Link to="/">Search for a doctor</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/appointments">Appointments</Link></li>
                                <li><Link to="/medication-planner">Medication planner</Link></li>                                  
                            </ul>
                            <button onClick={this.props.onLogout} className="button">LOG OUT</button>
                        </>

                        ) : (

                        <>
                            <Link to="/signup"><button className="button">SIGN UP</button></Link>
                            <Link to="/login"><button className="button">LOG IN</button></Link>
                        </>

                        )
                    }
                          
                </nav>                
            </div>
        )
    }
}
