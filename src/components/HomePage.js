import React, { Component } from 'react'
import HomeSeachResult from './HomeSeachResult'

import {API_URL} from '../config'
import axios from 'axios'

export default class HomePage extends Component {

    state = {
        doctors: [],
        filteredDoctors: [],
        specialityQuery: "",
        cityQuery: ""
        
    }



    componentDidMount(){
        axios.get(`${API_URL}/doctor/search`)
            .then((res) => {
            this.setState({
                doctors: res.data,
                filteredDoctors: res.data
            })
        })
    } 
    

    handleChange = (e) => {
        let docSearch = e.currentTarget.name
        let docSearchValue = e.currentTarget.value
        
        if (docSearch === "city"){
            this.setState({
                cityQuery: docSearchValue
            }, this.handleSearch())
        } else {
            this.setState({
                specialityQuery: docSearchValue
            }, this.handleSearch())
        }
    }
      


    handleSearch = (e) => {

        console.log("state in handle search", this.state.cityQuery)
        console.log("state in handle search", this.state.specialityQuery)

        let searchResult = this.state.doctors.filter(doctor => {
            if (!doctor.speciality || !doctor.city){
                return false
            } 
            console.log("inside the map",doctor.speciality)
            return doctor.speciality.toLowerCase().includes(this.state.specialityQuery.toLowerCase()) 
            &&  doctor.city.toLowerCase().includes(this.state.cityQuery.toLowerCase()) 

        })

        this.setState({
            filteredDoctors: searchResult
        })

    }
        


    render() {
        return (
            <>                               

                <div className="index-info-card">

                    <div className="index-img-card">
                        <img src="/images/doctors.png" alt="img"/> 
                        <figcaption>Access to thousands of doctors contacts. </figcaption>
                    </div>

                    <div className="index-img-card">
                        <img src="/images/online-booking.png" alt="img"/>
                        <figcaption>Book online without struggle and 24/7!</figcaption>
                    </div>

                    <div className="index-img-card">
                        <img src="/images/prescription.png" alt="img"/>
                        <figcaption>Access your prescriptions in your planner and follow up easily.</figcaption>
                    </div> 
                    
                </div>                  
                    
                    
                <input onChange={this.handleChange} name="speciality" type="text" placeholder="Type doctor speciality"></input>
                <input onChange={this.handleChange} name="city" type="text" placeholder="Type city"></input>
                <br/>
                <br/>

                <HomeSeachResult doctorList={this.state.filteredDoctors} />

                
            </>
        )
    }
}
