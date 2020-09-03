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
                                <Nav.Item className="nav-item">
                                    <Link to="/"><Nav.Link className="nav-link" href='/'>Search doctor</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link to="/profile" ><Nav.Link className="nav-link" href='/profile'>Profile</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link to="/appointments"><Nav.Link className="nav-link" href='/appointments'>Appointments</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link to="/medication-planner"><Nav.Link className="nav-link" href='/medication-planner'>Planner</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                <Nav.Link  onClick={this.props.onLogout}>Log Out</Nav.Link>
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
                                <Nav.Item className="nav-item">
                                    <Link to="/calendar"><Nav.Link className="nav-link" href='/calendar'>Calendar</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link to={`/doctor/${this.props.loggedInUser._id}`}><Nav.Link className="nav-link" href={`/doctor/${this.props.loggedInUser._id}`}>Profile</Nav.Link></Link>
                                </Nav.Item>     
                                <Nav.Item className="nav-item">
                                <Nav.Link  onClick={this.props.onLogout}>LOG OUT</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                        </>
                    ) : null}

                    {(!this.props.loggedInUser) ? (
                        <>
                            <Navbar expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav variant="tabs" className="mr-auto">
                                <Nav.Item className="nav-item">
                                    <Link to="/signup"><Nav.Link className="nav-link" href='/signup'>SIGN UP</Nav.Link></Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link to='/login'><Nav.Link className="nav-link" href='/login'>LOG IN</Nav.Link></Link>
                                </Nav.Item>     
                            </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                        </>
                    ) : null}
                       

                </div>

            </div>
        )

    }
}




