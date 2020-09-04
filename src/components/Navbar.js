import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Nav, Navbar} from 'react-bootstrap'


export default class NavBar extends Component {


    render() {

        return(

            <div className="navbar-all">

                <div className="navbar-logo">
                    <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link>
                </div>


                <div className="navbar-menu">

                    {(this.props.usertype === "patient") ? (
                        <>
                            <Navbar expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="tabs" className="mr-auto">
                                <Nav.Item >
                                    <Link to="/"><Nav.Link href='/'>Search doctor</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Link to="/profile" ><Nav.Link href='/profile'>Profile</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Link to="/appointments"><Nav.Link href='/appointments'>Appointments</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Link to="/medication-planner"><Nav.Link href='/medication-planner'>Planner</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                <Nav.Link  className="nav-log-out" onClick={this.props.onLogout}>Log Out</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                        </>
                    ) : null}

                    {(this.props.usertype === "doctor") ? (            
                        <>
                            <Navbar expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="tabs" className="mr-auto">                            
                                <Nav.Item >
                                    <Link to={`/doctor/${this.props.loggedInUser._id}`}><Nav.Link href={`/doctor/${this.props.loggedInUser._id}`}>Profile</Nav.Link></Link>
                                </Nav.Item>     
                                <Nav.Item >
                                    <Link to="/calendar"><Nav.Link href='/calendar'>Calendar</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link className="nav-log-out" onClick={this.props.onLogout}>Log Out</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                        </>
                    ) : null}

                    {(!this.props.loggedInUser) ? (
                        <>                       

                            <Link to="/signup" className="myButton log-sign-btn">SIGN UP</Link>
                            <Link to='/login' className="myButton log-sign-btn">LOG IN</Link>
                        </>
                        
                    ) : null}
                       

                </div>

            </div>
        )

    }
}




