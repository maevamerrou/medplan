import React, { Component } from 'react'
import Axios from 'axios'
import {API_URL} from '../config'
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
                    let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
                    let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
                    this.setState({currentmeds: filteredmeds})
                })
            })
    }

    

    previousDay(){
        this.setState({currentday: this.state.currentday.subtract(1, 'day')})
        let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
        let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
        this.setState({currentmeds: filteredmeds})
    }

    nextDay(){
        this.setState({currentday: this.state.currentday.add(1, 'day')})
        let arraymeds = this.state.patient.prescriptions.map(prescription=> prescription.medications).flat()
        let filteredmeds= arraymeds.filter(medication=> moment(this.state.currentday).isBefore(medication.endDate) && moment(medication.startDate).isBefore(this.state.currentday) && (this.state.currentday.diff(moment(medication.startDate), 'days'))%medication.daysPerTake===0)
        this.setState({currentmeds: filteredmeds})
    }

    render() {

        if (!this.state.currentmeds){
            return <img src="../images/loader.gif" alt="loader"/>
          }

        return (
            <>

                <div className="patient-cal-date-field">
                    <button className="myButton calendar-day" onClick={()=>this.previousDay()}>&lt;</button>
                    <h4>{this.state.currentday.format("Do MMM, YYYY").toString()}</h4>
                    <button className="myButton calendar-day" onClick={()=>this.nextDay()}>&gt;</button>
                </div>

                <div className="main-content patient-cal-day-times">

                    <h4 className="time-planner">Morning</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===2){return <div><p className="medicine-line">{med.name} -  {med.dosePerTake} - Note: {med.comments}</p></div>}})}
                    <hr/>

                    <h4 className="time-planner">Noon</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===1){return <div><p className="medicine-line">{med.name} -  {med.dosePerTake} - Note: {med.comments}</p></div>}})}
                    <hr/>

                    <h4 className="time-planner">Night</h4>
                    {this.state.currentmeds.map(med=> {if (med.takesPerDay===3 ||med.takesPerDay===2){return <div><p className="medicine-line">{med.name} -  {med.dosePerTake} - Note: {med.comments}</p></div>}})}
                </div>
            
            </>
        )
    }
}
