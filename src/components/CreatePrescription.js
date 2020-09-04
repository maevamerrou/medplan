
import React, { Component } from 'react'
import PrescriptionItem from './PrescriptionItem'
import PrescriptionForm from './PrescriptionForm'
import axios from 'axios'
import {API_URL} from '../config'
import moment from 'moment'
import {Modal, Button} from 'react-bootstrap'



 


export default class CreatePrescription extends Component {

  state={
    prescription: {medications:[]},
    showCreate: false,
    showSubmit: false
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
      this.setState({showSubmit: true})
      return

    }
    let clonePrescription= JSON.parse(JSON.stringify(this.state.prescription))
    clonePrescription.medications.push(newMedication)
    this.setState({prescription: clonePrescription})
    let inputs = e.currentTarget.getElementsByTagName('INPUT')
    let commentfield = e.currentTarget.getElementsByTagName('TEXTAREA')[0]
    for (let input of inputs) input.value=''
    commentfield.value= ''
    
  }

  

  handleDelete=(id)=>{
    let newPrescription= this.state.prescription.medications.filter((medication, index) => {
      return index !== id
    })
    this.setState({prescription: {medications: newPrescription}})
  }

  handleCreate=()=>{
    axios.post(`${API_URL}/create-prescription/${this.props.match.params.appointmentId}`, {medications:
      this.state.prescription.medications}, {withCredentials:true})
      .then(res=> {
        this.props.history.push(`/calendar/${this.props.match.params.appointmentId}`)
      })
      .catch(err=> {
        this.setState({showCreate: true})
      })
  }

  handleClose=()=>{
    this.setState({showCreate: false, showSubmit: false})
  }



  render() {
    return (
      <>
        <h1>Prescription Form</h1>
        
        <div className="main-content prescrition-form-card">

          <PrescriptionForm onCommit={this.handleSubmit}/>

          <button className="myButton save-pres-btn" onClick={this.handleCreate}>Save prescription</button>

          <div className="medications-added-card">            
            {(this.state.prescription.medications) ? this.state.prescription.medications.map((medication, id)=>{return <><PrescriptionItem key={id} id={id} medication={medication} onDelete={this.handleDelete}/> <hr/></>}): null
            }
          </div>

          <p>{this.state.errorMsg}</p>   

          <Modal show={this.state.showCreate} onHide={this.handleClose}>
            <Modal.Body>All fields except for the comments are mandatory.</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                In understood
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showSubmit} onHide={this.handleClose}>
            <Modal.Body>Impossible parameters. Please double check the prescription</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                In understood
              </Button>
            </Modal.Footer>
          </Modal>

          

        </div>

       
      </>
    )
  }
}
