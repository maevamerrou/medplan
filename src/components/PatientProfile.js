import React, { Component } from 'react'
import Login from "./Login"
import axios from 'axios'
import {API_URL} from '../config'

export default class PatientProfile extends Component {

  state={
    patient: {},
    updatedField: {},
    editing: false,
    unedited: '',
  }

  componentDidMount(){
    axios.get(`${API_URL}/planner`, {withCredentials: true})
      .then((res)=>{
        this.setState({
          patient: res.data
        })
      })    
  }
  

//Edit Profile methods

  handleChange = (e) => {
    const {name, value}= e.currentTarget
    this.setState({
        updatedField: {[name]: value}, 
        patient: {...this.state.patient, [name]:value}
    })
  }

  handleEnable = (e)=>{
    if (!this.state.editing){
    let buttons = e.getElementsByTagName('BUTTON')
    e.getElementsByTagName('INPUT')[0].readOnly = false
    e.getElementsByTagName('INPUT')[0].classList.toggle('readonly-field')
    let field= e.getElementsByTagName('INPUT')[0].value
    for (let button of buttons){button.classList.toggle('hidden-button')}
    this.setState({editing: !this.state.editing, unedited: field})
    }
  }
  
  handleDisable = (e)=>{
    let buttons = e.getElementsByTagName('BUTTON')
    e.getElementsByTagName('INPUT')[0].readOnly = true
    e.getElementsByTagName('INPUT')[0].classList.toggle('readonly-field')
    let field= e.getElementsByTagName('INPUT')[0].name
    for (let button of buttons){button.classList.toggle('hidden-button')}
    this.setState({editing: !this.state.editing, patient:  {...this.state.patient, [field]: this.state.unedited, updatedField:{}}})
  }

  handleEdit = (e, d) => {
    let keyName= Object.keys(e)[0]
    let value = Object.values(e)[0]
    axios.patch(`${API_URL}/patient/${this.props.loggedInUser._id}`, {[keyName]: value}, {withCredentials:true})
    // this.setState({


    // })
    let buttons = d.getElementsByTagName('BUTTON')
    d.getElementsByTagName('INPUT')[0].classList.toggle('readonly-field')
    for (let button of buttons){button.classList.toggle('hidden-button')}
    this.setState({editing: !this.state.editing})
  }


 
  render() {
    if (!this.props.loggedInUser){
      return <Login />
    }

    if (!this.state.patient){
      return <img src="../images/loader.gif" alt="loader"/>
    }


    const {username, birthDate, height, weight, allergies, history, phoneNumber, address, email} = this.state.patient

    return (
      <>
        <h1>Profile</h1>


        <div className="main-content profile-page-content">

          <div className="profile-field" id='name-profile'>
            <label className="profile-label"><strong>Full Name</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="username" type="text" value={username}  onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
            <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='birthDate-profile'>
            <label className="profile-label"><strong>Birth Date</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="birthDate" type="text" value={birthDate}  onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('birthDate-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('birthDate-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('birthDate-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>
    
          <div className="profile-field" id='address-profile'>
            <label className="profile-label"><strong>Address</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="address" type="text" value={address} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='email-profile'>
            <label className="profile-label"><strong>E-Mail</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="email"  type="email" value={email} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>  
          </div>

          <div className="profile-field" id='phoneNumber-profile'>
            <label className="profile-label"><strong>Telephone</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="phoneNumber" type="text" value={phoneNumber} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('phoneNumber-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('phoneNumber-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('phoneNumber-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='height-profile'>
            <label className="profile-label"><strong>Height (cm)</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="height" type="text" value={height} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('height-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('height-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('height-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='weight-profile'>
            <label className="profile-label"><strong>Weight (kg)</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="weight" type="text" value={weight} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('weight-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('weight-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('weight-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='allergies-profile'>
            <label className="profile-label"><strong>Allergies</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="allergies" type="text" value={allergies} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('allergies-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
            <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('allergies-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('allergies-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

          <div className="profile-field" id='history-profile'>
            <label className="profile-label"><strong>Medical History</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="history" type="text" value={history} onChange={this.handleChange}></input>
            <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('history-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
          <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('history-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
            <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('history-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
          </div>

        </div>

        

      </>
    )
  }

}

  

  