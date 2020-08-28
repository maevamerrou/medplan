import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class SideBar extends Component {


    render() {
        return (
            <div>
                <nav>                

                    {
                        this.props.loggedInUser ? (

                        <>
                            <Link to="/">Search for a doctor</Link>
                            <Link to="/">Profile</Link>
                            <Link to="/">Appointments</Link>
                            <Link to="/">Medication planner</Link>

                            <button onClick={this.props.onLogout}>LOG OUT</button>
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
