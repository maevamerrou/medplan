import React, { Component } from 'react'

export default class PrescriptionItem extends Component {
  render() {
    return (
      <>

        <div className="added-med">
          <p><strong>Medication: </strong>{this.props.medication.name}</p>
          <p><strong>Dose per take: </strong>{this.props.medication.dosePerTake}</p>
          <p><strong>Takes per day: </strong>{this.props.medication.takesPerDay}</p>
          <p><strong>Days per take: </strong>{this.props.medication.daysPerTake}</p>
          <p><strong>Start date: </strong>{this.props.medication.startDate}</p>
          <p><strong>End date: </strong>{this.props.medication.endDate}</p>
          <p><strong>Comments: </strong>{this.props.medication.comments}</p>

          <button className="button" onClick={()=>this.props.onDelete(this.props.id)}>Delete</button> 
        </div>
        
      </>
    )
  }
}
