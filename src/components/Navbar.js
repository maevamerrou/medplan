import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {


    render() {
        return (
            <>
                <header>

                    <Link to="/"><img src="../images/logo.jpg" alt="logo" class="header-logo"/></Link> 

                </header>
            </>
        )
    }
}
