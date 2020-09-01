import React, { Component } from 'react'

export default class PrescriptionItem extends Component {
  render() {
    return (
      <>

        <p>Medication: {this.props.medication.name}</p>
        <p>Dose per take: {this.props.medication.dosePerTake}</p>
        <p>Takes per day: {this.props.medication.takesPerDay}</p>
        <p>Days per take: {this.props.medication.daysPerTake}</p>
        <p>Start date: {this.props.medication.startDate}</p>
        <p>End date: {this.props.medication.endDate}</p>
        <p>Comments: {this.props.medication.comments}</p>

        <button className="button" onClick={()=>this.props.onDelete(this.props.id)}>Delete</button>
      </>
    )
  }
}
