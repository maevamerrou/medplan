import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {


    render() {
        return (
            <>
                <header>

                    <Link to="/"><img src="../images/logo-transparent.png" alt="logo" className="header-logo"/></Link> 

                </header>
            </>
        )
    }
}
