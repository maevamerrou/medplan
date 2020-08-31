
import React, { Component } from 'react'
import PrescriptionItem from './PrescriptionItem'
import PrescriptionForm from './PrescriptionForm'
import axios from 'axios'

 


export default class CreatePrescription extends Component {

  state={
    prescription: {medications:{}}
  }

  componentDidMount(){
    axios.get()
  }

  render() {
    return (
      <div>
      Please fill in all the fields


      <hr></hr>
      <PrescriptionItem />
        
      </div>
    )
  }
}
