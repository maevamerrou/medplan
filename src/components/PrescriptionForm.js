import React, { Component } from 'react'

export default class PrescriptionForm extends Component {
  render() {
    return (
      <>

        <form className='prescription-form' onSubmit={this.props.onCommit}>
        
          <small>Please fill in all the fields</small>

          <div className="presription-inputs">
            <label>Medication name </label>
            <input name='name' id='name' type='text'/>
          </div>

          <div className="presription-inputs">
            <label>Dose per take </label>
            <input name='dosePerTake' id='dosePerTake' type='text' placeholder='ex: 2 pills'/>
          </div>

          <div className="presription-inputs">
            <label>Takes per day </label>
            <input name='takesPerDay' id='takesPerDay' type='number' min='0'/>
          </div>

          <div className="presription-inputs">
            <label>Days per take </label>
            <input name='daysPerTake' id='daysPerTake' type='number' min='0'/>
            <small>If the patient needs to take the medication every day, write 1. If once every two days, write 2 and so on.</small>

          </div>
          <div className="presription-inputs">
            <label>Start date </label>
            <input name='startDate' id='startDate' min={Date.now().toLocaleString()} type='date' placeholder='When should the patient start the treatment?'/>
          </div>

          <div className="presription-inputs">
            <label>End date </label>
            <input name='endDate' id='endDate' type='date' placeholder='When should the patient stop the treatment?'/>
          </div>

          <div className="presription-inputs">
            <label>Comments </label>
            <textarea name='comments' id='comments' type='text' placeholder='Additional comment' rows="3" cols="30"></textarea>
          </div>

          

          <button className="add-med-btn" type='submit'><img src="/images/btn-add.png" alt="btn"/></button>

        </form>        
        
      </>
    )
  }
}
