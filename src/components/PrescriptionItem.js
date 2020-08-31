import React, { Component } from 'react'

export default class PrescriptionItem extends Component {
  render() {
    return (
      <div>
        <label>Medication</label>
        <input value={this.props.name}/>   
      </div>
    )
  }
}
