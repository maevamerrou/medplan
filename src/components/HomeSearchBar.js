import React, { Component } from 'react'


export default class HomeSearchBar extends Component {



    render() {
        return (
            <div>

                <input onChange={this.props.onSearch} name="speciality" type="text" placeholder="Type doctor speciality"></input>
                <input onChange={this.props.onSearch} name="city" type="text" placeholder="Type city"></input>
                
            </div>
        )
    }
}
