import React, { Component } from 'react'

export default class PrescriptionForm extends Component {
  render() {
    return (
      <div>

<form onSubmit={this.props.onCommit}>
        <div>
          <label>Medication</label>
          <input name='name' id='name' type='text' placeholder='Write the name of the medication'/>
        </div>
        <div>
          <label>Dose per take</label>
          <input name='dosePerTake' id='dosePerTake' type='text' placeholder='Write the dose per take'/>
        </div>
        <div>
          <label>Takes per day</label>
          <input name='takesPerDay' id='takesPerDay' type='number' placeholder='How many takes per day?'/>
        </div>
        <div>
          <label>Days per take</label>
          <input name='daysPerTake' id='daysPerTake' type='number' placeholder='Write the name of the medication'/>
          <small>If the patient needs to take the medication every day, write 1. If once every two days, write 2 and so on.</small>
        </div>
        <div>
          <label>Start date</label>
          <input name='startDate' id='startDate' type='date' placeholder='When should the patient start the treatment?'/>
        </div>
        <div>
          <label>End date</label>
          <input name='endDate' id='endDate' type='date' placeholder='When should the patient stop the treatment?'/>
        </div>
        <div>
          <label>Comments</label>
          <input name='comments' id='comments' type='text' placeholder='Write any additional comment.'/>
        </div>
      <button type='submit'>Commit</button>
      </form>
        
      </div>
    )
  }
}
