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
                cityQuery:  docSearchValue
            }, ()=>this.handleSearch())
        } else {
            this.setState({
                specialityQuery: docSearchValue
            }, ()=>this.handleSearch())
        }
    }
      


    handleSearch = (e) => {

        let searchResult = this.state.doctors.filter(doctor => {
            if (!doctor.speciality || !doctor.city){
                return false
            } 

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
                        <p>Thousands of doctors available on the platform.</p>
                    </div>

                    <div className="index-img-card">
                        <img src="/images/online-booking.png" alt="img"/>
                        <p>Easy online booking without struggle and 24/7!</p>
                    </div>

                    <div className="index-img-card">
                        <img src="/images/prescription.png" alt="img"/>
                        <p>Direct access to your prescriptions.</p>
                    </div> 
                    
                </div>  

                <div className="home-search-bar">
                    <input className="input-search" onChange={this.handleChange} name="speciality" type="text" placeholder="Search by speciality"></input>
                    <input className="input-search" onChange={this.handleChange} name="city" type="text" placeholder="Search by city"></input>
                </div>

             
                {/* <MapContainer /> */}

                <HomeSeachResult doctorList={this.state.filteredDoctors} />

               
                
            </>
        )
    }
}

