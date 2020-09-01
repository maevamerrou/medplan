
import React, { Component } from 'react'
import PrescriptionItem from './PrescriptionItem'
import PrescriptionForm from './PrescriptionForm'
import axios from 'axios'
import {API_URL} from '../config'
import moment from 'moment'

 


export default class CreatePrescription extends Component {

  state={
    prescription: {medications:[]}
  }


  handleSubmit=(e)=>{
    e.preventDefault()
    
    const {name, dosePerTake, startDate, endDate, takesPerDay, daysPerTake, comments} = e.currentTarget
    let newMedication ={
      name: name.value, 
      dosePerTake: dosePerTake.value,
      startDate: startDate.value,
      endDate: endDate.value,
      takesPerDay: takesPerDay.value,
      daysPerTake: daysPerTake.value,
      comments: comments.value}

    if (moment(startDate.value).isBefore(moment(Date.now())) || takesPerDay<=0 || daysPerTake<=0){
      alert('Impossible parameters. Please double check the prescription')
      return

    }
    let clonePrescription= JSON.parse(JSON.stringify(this.state.prescription))
    clonePrescription.medications.push(newMedication)
    this.setState({prescription: clonePrescription})
    let inputs = e.currentTarget.getElementsByTagName('INPUT')
    for (let input of inputs) input.value=''
    
  }

  

  handleDelete=(id)=>{
    console.log(id)
    let newPrescription= this.state.prescription.medications.filter((medication, index) => {
      return index !== id
    })
    console.log ( newPrescription)
    
    this.setState({prescription: {medications: newPrescription}})

  }

  handleCreate=()=>{
    console.log(this.state.prescription.medications)
    axios.post(`${API_URL}/create-prescription/${this.props.match.params.appointmentId}`, {medications:
      this.state.prescription.medications}, {withCredentials:true})
      .then(res=> {
        this.props.history('/')
      })
      .catch(err=> this.setState({errorMsg: 'Could not create prescription. Please check that everything is filled out and try again.'}))
  }


  render() {
    return (
      <>
        <h1>Prescription Form</h1>

        
        <p>Please fill in all the fields</p>
        
        <br/>

        <div>
          <PrescriptionForm onCommit={this.handleSubmit}/>

          <button className="button save-pres-btn" onClick={this.handleCreate}>Save prescription</button>

          <p>{this.state.errorMsg}</p>
          
          {(this.state.prescription.medications) ? this.state.prescription.medications.map((medication, id)=>{return <><PrescriptionItem key={id} id={id} medication={medication} onDelete={this.handleDelete}/> <hr/></>}): null
          }

        </div>

       
      </>
    )
  }
}
