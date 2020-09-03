import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Nav, Navbar} from 'react-bootstrap'


export default class SideBar extends Component {

    render() {

        if (this.props.usertype === "patient"){
            return(            
            <>
                <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link>
                <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav variant="tabs" className="mr-auto">
                    <Nav.Item>
                        <Link to="/"><Nav.Link href='/'>Search</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/profile" ><Nav.Link href='/profile'>Profile</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/appointments"><Nav.Link href='/appointments'>Appointments</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/medication-planner"><Nav.Link href='/medication-planner'>Planner</Nav.Link></Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link  onClick={this.props.onLogout}>LOG OUT</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
            </>
)}

if (this.props.usertype === "doctor"){
    return(            
    <>
        <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link>
        <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav variant="tabs" className="mr-auto">
            <Nav.Item>
                <Link to="/calendar"><Nav.Link href='/calendar'>Calendar</Nav.Link></Link>
            </Nav.Item>
            <Nav.Item>
                <Link to={`/doctor/${this.props.loggedInUser._id}`}><Nav.Link href={`/doctor/${this.props.loggedInUser._id}`}>Profile</Nav.Link></Link>
            </Nav.Item>     
            <Nav.Item>
              <Nav.Link  onClick={this.props.onLogout}>LOG OUT</Nav.Link>
            </Nav.Item>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
    </>
    )}

    else if (!this.props.loggedInUser){
        return(            
        <>
            <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link>
            <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="tabs" className="mr-auto">
                <Nav.Item>
                    <Link to="/signup"><Nav.Link href='/signup'>SIGN UP</Nav.Link></Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to='/login'><Nav.Link href='/login'>LOG IN</Nav.Link></Link>
                </Nav.Item>     
            </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
        )}

    //     <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link> 

    //     </header>

    //     if (this.props.usertype === "patient"){
    //         return (
    //             <>    
    //                 <nav>
    //                     <h4>Patient: {this.props.loggedInUser.username}</h4>
    //                     <ul>
    //                         <li><Link to="/">Search for a doctor</Link></li>
    //                         <li><Link to="/profile">Profile</Link></li>
    //                         <li><Link to="/appointments">Appointments</Link></li>
    //                         <li><Link to="/medication-planner">Medication planner</Link></li>                                  
    //                     </ul>
    //                     <button onClick={this.props.onLogout} className="button">LOG OUT</button>
    //                 </nav>                   
    //             </>
    //         )


    //     } else if (this.props.usertype === "doctor"){
    //         return (
    //             <>
    //                 <nav>

    //                     <h4>Doctor: {this.props.loggedInUser.username}</h4>

    //                     <ul>
    //                         <li><Link to="/calendar">Calendar</Link></li>
    //                         <li><Link to={`/doctor/${this.props.loggedInUser._id}`}>Profile</Link></li>
    //                         <li><Link to="/">Search for a doctor</Link></li>
    //                     </ul>
    //                     <button onClick={this.props.onLogout} className="button">LOG OUT</button>  
    //                 </nav>                   
    //             </>                
    //         )

            
    //     } else if (!this.props.loggedInUser){
    //         return (
    //             <>
    //                 <nav>                    
    //                     <Link to="/signup"><button className="button">SIGN UP</button></Link>
    //                     <Link to="/login"><button className="button">LOG IN</button></Link>                    
    //                 </nav>  
    //             </>
    //         )
    //     } else {
    //         return null
    //     }
    }
}




