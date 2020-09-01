import React, { Component } from 'react'
import Axios from 'axios'
import {API_URL} from '../config'
// import { DayCellContent } from '@fullcalendar/react'
import moment from 'moment'

export default class PatientMedPlanner extends Component {

    state={
        patient:{},
        currentday: moment(Date.now()) 
    }

    componentDidMount(){
        Axios.get(`${API_URL}/planner`, {withCredentials:true})
            .then((res)=>{
                this.setState({patient: res.data}, ()=>{
                    console.log(this.state.patient)
                    let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
                    let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
                    this.setState({currentmeds: filteredmeds}, ()=>console.log(this.state))
                })
            })
    }

    // componentDidUpdate(prevProps, prevState){

    // }
    

    previousDay(){
        this.setState({currentday: this.state.currentday.subtract(1, 'day')}, console.log (this.state.currentday.toString()))
        let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
        let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
        this.setState({currentmeds: filteredmeds}, ()=>console.log(this.state))
    }

    nextDay(){
        this.setState({currentday: this.state.currentday.add(1, 'day')}, console.log (this.state.currentday.toString()))
        let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
        let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
        this.setState({currentmeds: filteredmeds}, ()=>console.log(this.state))
    }

    render() {

        if (!this.state.currentmeds){
            return <p>Loading ....</p>
          }

        return (
            <>
                <h1>Medication Planner</h1>

                <div className="patient-cal-date-field">
                    <button className="button" onClick={()=>this.previousDay()}>Previous day</button>
                    <h4>{this.state.currentday.format("Do MMM, YYYY").toString()}</h4>
                    <button className="button" onClick={()=>this.nextDay()}>Next day</button>
                </div>

                <div className="patient-cal-day-times">

                    <h4>Morning</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===2){return <div>Medication: {med.name}</div>}})}
                    <hr></hr>

                    <h4>Noon</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===1){return <div>Medication: {med.name}</div>}})}
                    <hr/>

                    <h4>Night</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===2){return <div>Medication: {med.name}</div>}})}
                </div>
            
            </>
        )
    }
}
