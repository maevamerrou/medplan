import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import moment from 'moment'
import momentPlugin from '@fullcalendar/moment'


export default class DoctorProfile extends Component {

  state={
    doctor: {},
    weekendsVisible: false,
    currentEvents: [],
    updatedField: {},
    editing: false,
    unedited: '',
    appointments: [],
    events:[]
  }

  componentDidMount(){
    axios.get(`${API_URL}/doctor/${this.props.match.params.doctorId}`, {withCredentials: true})
      .then((res)=>{
        this.setState({doctor: res.data}, ()=>{console.log(this.state.doctor, new Date(this.state.doctor.openingTime))})
      })
      axios.get(`${API_URL}/doctor/appointments/${this.props.match.params.doctorId}`, {withCredentials: true})
      .then((res)=>{
        this.setState({appointments: res.data, events: res.data.map(appointment=>{
          console.log ('ids:', appointment.patient, this.props.loggedInUser._id)
          let eventColor= appointment.patient._id===this.props.loggedInUser._id? '#3788d8': 'gray'
          let proper = appointment.patient._id===this.props.loggedInUser._id? true : false
          return {title: appointment.reason, start:appointment.time, id:appointment.eventId, startEditable: proper, patient: appointment.patient, color: eventColor}})},
         ()=>{console.log(this.state)}
         ) 
      })
      
  }
  

//Edit Profile methods

  handleChange = (e) => {
    const {name, value}= e.currentTarget
    this.setState({
        updatedField: {[name]: value}, 
        doctor:{...this.state.doctor, [name]:value}
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
    this.setState({editing: !this.state.editing, doctor: {...this.state.doctor, [field]: this.state.unedited, updatedField:{}}})
  }

  handleEdit = (e, d) => {
    let keyName= Object.keys(e)[0]
    let value = Object.values(e)[0]
    axios.patch(`${API_URL}/doctor/${this.props.match.params.doctorId}`, {[keyName]: value}, {withCredentials:true})
    let buttons = d.getElementsByTagName('BUTTON')
    d.getElementsByTagName('INPUT')[0].classList.toggle('readonly-field')
    for (let button of buttons){button.classList.toggle('hidden-button')}
    this.setState({editing: !this.state.editing})
  }

  handleImgEnable= (e)=>{
      e.getElementsByTagName('INPUT')[0].classList.toggle('hidden-button')
      e.getElementsByTagName('BUTTON')[1].classList.toggle('hidden-button')
      this.setState({editing: !this.state.editing})
  }

  handleImgEdit =(e)=>{
    if (e){
    let image = e.getElementsByTagName('INPUT')[0].files[0]
    let uploadData = new FormData()
    uploadData.append('imageUrl', image)
    let uppicture
    e.getElementsByTagName('INPUT')[0].classList.toggle('hidden-button')
    e.getElementsByTagName('BUTTON')[1].classList.toggle('hidden-button')
    axios.post(`${API_URL}/upload`, uploadData)
    .then((res)=> {uppicture= res.data.image; axios.patch(`${API_URL}/doctor/${this.props.match.params.doctorId}`, {picture: res.data.image}, {withCredentials:true})})
    .then((res)=>{console.log (res);this.setState({doctor:{...this.state.doctor, picture: uppicture}})})
    
  }}

  //Calendar methods 
  handleDateSelect = (selectInfo) => {
    if (!moment(new Date(selectInfo.startStr)).isBefore(Date.now())) {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect()
      
      if (selectInfo.end-selectInfo.start>1800000) {
        alert('Appointments must have a duration of half an hour')
        return
      }

    let title = prompt('Please enter the reason for the appointment: ')
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        patient: this.props.loggedInUser._id,
        startEditable: true,
        editable: false
      })
    }}
    else{
      selectInfo.view.calendar.unselect()
      alert('Please, select a valid date')
    }
  }
  
  handleEventClick = (clickInfo) => {
    console.log (clickInfo.event.startStr)
    if ((clickInfo.event.extendedProps.patient._id === this.props.loggedInUser._id || clickInfo.event.extendedProps.patient === this.props.loggedInUser._id)
      && moment(clickInfo.event.startStr).isAfter(moment(Date.now()))
      ){
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))   {clickInfo.event.remove()}
     
  }}
  
  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  //Linking of calendar with database
  appoCreate= (event) =>{
    console.log (event.event)
    axios.post(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}`, 
      {time: event.event.start, eventId: event.event.id, reason: event.event.title}, {withCredentials:true})
  }

  appoEdit= (event) =>{
    axios.patch(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}`, 
      {time: event.event.start, eventId: event.event.id, reason: event.event.title}, {withCredentials:true})
  }

  appoCancel= (event) =>{
    console.log (event.event)
    axios.delete(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}/${event.event.id}`, {withCredentials:true})
  }
  
  render() {

    

    if (!this.state.doctor){
      return <img src="../images/loader.gif" alt="loader"/>
    }
    
    const {username, speciality, city, address, email, phone, openingTime, closingTime, picture} = this.state.doctor
 
    return (
      //Profile
      <>

        <h1>Doctor Profile</h1>

        <div className="main-content profile-page-content">

          <div className="profile-field" id='image-profile'>
              <img src={picture} alt='' className="doc-img"/>
              {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
                <>
                  <button className="edit-profile" onClick={()=>this.handleImgEnable(document.getElementById('image-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                  <input  autocomplete="off" type="file" className="form-control hidden-button" name="image" id="image" />
                <button type='submit' className='hidden-button edit-profile' onClick={()=>this.handleImgEdit(document.getElementById('image-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
                </>
              :null}
          </div>

          <div className="profile-field" id='name-profile'>
            <label className="profile-label"><strong>Name</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="username" type="text" value={username}  onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('name-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}
          </div>

          <div className="profile-field" id='speciality-profile'>
            <label className="profile-label"><strong>Speciality</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="speciality" type="text" value={speciality}  onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('speciality-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('speciality-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('speciality-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}
          </div>

          <div className="profile-field" id='city-profile'>
            <label className="profile-label"><strong>City</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="city" type="text" value={city} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('city-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('city-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('city-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
          :null}
          </div>

          <div className="profile-field" id='address-profile'>
            <label className="profile-label"><strong>Address</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="address" type="text" value={address} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('address-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}
          </div>

          <div className="profile-field" id='email-profile'>
            <label className="profile-label"><strong>E-Mail</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="email"  type="email" value={email} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('email-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>  
              </>
            :null}
          </div>

          <div className="profile-field" id='phone-profile'>
            <label className="profile-label"><strong>Telephone</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="phone" type="text" value={phone} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('phone-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('phone-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('phone-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}        
          </div>
          
          <div className="profile-field" id='opening-profile'>
            <label className="profile-label"><strong>Opening time</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="openingTime" type="text" value={openingTime} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('opening-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('opening-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('opening-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}
          </div>
          
          <div className="profile-field" id='closing-profile'>
            <label className="profile-label"><strong>Closing time</strong></label>
            <input autocomplete="off" className='readonly-field' readOnly={true} name="closingTime" type="text" value={closingTime} onChange={this.handleChange}></input>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button className="edit-profile" onClick={()=>this.handleEnable(document.getElementById('closing-profile'))}><img className="img-edit-btn-profile" src="/images/btn-edit.png" alt="tbt"/></button>
                <button className='hidden-button edit-profile' onClick={()=>this.handleDisable(document.getElementById('closing-profile'))}><img className="img-edit-btn-profile" src="/images/btn-delete.png" alt="tbt"/></button>
              <button type='submit' className='hidden-button edit-profile' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('closing-profile'))}><img className="img-edit-btn-profile" src="/images/btn-valid.png" alt="tbt"/></button>
              </>
            :null}
          </div>

          

          {/*Calendar  */}
          {(this.props.usertype==='patient') ? 
           <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next'
              }}
              initialView='timeGridWeek'
              titleFormat = 'Do MMM YYYY'
              selectable={true}
              selectMirror={false}
              dayMaxEvents={true}
              allDaySlot= {false}
              eventStartEditable={true}
              slotMinTime= '08:00'
              slotMaxTime= '20:00'
              businessHours = {{businessHours: {
                  daysOfWeek: [ 1, 2, 3, 4, 5 ], 
                  startTime: this.state.doctor.openingTime, 
                  endTime: this.state.doctor.closingTime, 
                }}}
              eventConstraint= {{
                  start: Date.now(),
                  end: '2100-01-01' // hard coded goodness unfortunately
                }}
              weekends={this.state.weekendsVisible}
              events={this.state.events} 
              select={this.handleDateSelect}
              eventContent={renderEventContent} 
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} 
              eventAdd={(event)=>this.appoCreate(event)}
              eventChange={(event)=>this.appoEdit(event)}
              eventRemove={(event)=>this.appoCancel(event)}
              defaultTimedEventDuration= '00:30'
            />
            :null}

        </div>     
                   
      </>        
      )
    
    }
  }
  // Auxiliary function for rendering the events in the calendar
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
      </>
    )
  }
  