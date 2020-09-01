
import React, { Component } from 'react'
import PrescriptionItem from './PrescriptionItem'
import PrescriptionForm from './PrescriptionForm'
import axios from 'axios'
import {API_URL} from '../config'

 


export default class CreatePrescription extends Component {

  state={
    prescription: {medications:[]}
  }

  componentDidMount(){
    axios.get(`${API_URL}/fetch-prescription/${this.props.match.params.appointmentId}`, {withCredentials: true})
      .then(result => {this.setState({presciption: result.data}, ()=>console.log(this.state.prescription))
        
      })
  }


  handleSubmit=(e)=>{
    e.preventDefault()
    console.log (e.currentTarget)
    const {name, dosePerTake, startDate, endDate, takesPerDay, daysPerTake, comments} = e.currentTarget
    let newMedication ={
      name: name.value, 
      dosePerTake: dosePerTake.value,
      startDate: startDate.value,
      endDate: endDate.value,
      takesPerDay: takesPerDay.value,
      daysPerTake: daysPerTake.value,
      comments: comments.value}
    let clonePrescription= JSON.parse(JSON.stringify(this.state.prescription))
    console.log (newMedication, clonePrescription)
    clonePrescription.medications.push(newMedication)
    this.setState({prescription: clonePrescription})

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
  }


  render() {
    return (
      <>
        <h1>Prescription Form</h1>
        
        <div className="main-content prescrition-form-card">

          <PrescriptionForm onCommit={this.handleSubmit}/>

          <button className="button save-pres-btn" onClick={this.handleCreate}>Save prescription</button>

          <div className="medications-added-card">
            {this.state.prescription.medications.map((medication, id)=>{return <><PrescriptionItem key={id} id={id} medication={medication} onDelete={this.handleDelete}/> </>})
            }
          </div>
          
          

        </div>

       
      </>
    )
  }
}
