import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import moment from 'moment'

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
        this.setState({appointments: res.data, events: res.data.map(appointment=>{return {title: appointment.reason, start:appointment.time, id:appointment.eventId, editable: false, patient: appointment.patient}})}, ()=>console.log(this.state)) 
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
    axios.post(`${API_URL}/upload`, uploadData)
    .then((res)=> {uppicture= res.data.image; axios.patch(`${API_URL}/doctor/${this.props.match.params.doctorId}`, {picture: res.data.image}, {withCredentials:true})})
    .then((res)=>{console.log (res);this.setState({doctor:{...this.state.doctor, picture: uppicture}})})
    
  }}

  //Calendar methods 
  handleDateSelect = (selectInfo) => {
    if (!moment(new Date(selectInfo.startStr)).isBefore(Date.now())) {
    let title = prompt('Please enter the reason for the appointment: ')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        patient: this.props.loggedInUser._id,
        startEditable: true,
        eventDurationEditable: false
      })
    }}
    else{
      selectInfo.view.calendar.unselect()
      alert('Please, select a valid date')
    }
  }
  
  handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.patient._id === this.props.loggedInUser._id){
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))   {clickInfo.event.remove()}
     
  }}
  
  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  //Linking of calendar with database
  appoCreate= (event) =>{
    axios.post(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}`, 
      {time: event.event.start, eventId: event.event.id, reason: event.event.title}, {withCredentials:true})
  }

  appoEdit= (event) =>{
    axios.patch(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}`, 
      {time: event.event.start, eventId: event.event.id, reason: event.event.title}, {withCredentials:true})
  }

  appoCancel= (event) =>{
    axios.delete(`${API_URL}/patient/appointments/${this.props.match.params.doctorId}/${event.event.id}`, {withCredentials:true})
  }
  
  render() {

    

    if (!this.state.doctor){
      return <p>Loading ....</p>
    }
    
    const {username, speciality, city, address, email, phone, openingTime, closingTime, picture} = this.state.doctor
 
    return (
      //Profile
      <div>
        <div id='image-profile'>
            <img src={picture} alt=''/>
            {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
              <>
                <button onClick={()=>this.handleImgEnable(document.getElementById('image-profile'))}>Edit</button>
                <input  type="file" className="form-control hidden-button" name="image" id="image" />
                <button type='submit' className='hidden-button' onClick={()=>this.handleImgEdit(document.getElementById('image-profile'))}>Submit</button>
              </>
            :null}
        </div>

        <div id='name-profile'>
          <label>Name</label>
          <input className='readonly-field' readOnly={true} name="username" type="text" value={username}  onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('name-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('name-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('name-profile'))}>Confirm</button>
            </>
          :null}
        </div>

        <div id='speciality-profile'>
          <label>Speciality</label>
          <input className='readonly-field' readOnly={true} name="speciality" type="text" value={speciality}  onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('speciality-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('speciality-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('speciality-profile'))}>Confirm</button>
            </>
          :null}
        </div>

        <div id='city-profile'>
          <label>City</label>
          <input className='readonly-field' readOnly={true} name="city" type="text" value={city} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('city-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('city-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('city-profile'))}>Confirm</button>
            </>
         :null}
        </div>

        <div id='address-profile'>
          <label>Address</label>
          <input className='readonly-field' readOnly={true} name="phone" type="text" value={address} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('address-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('address-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('address-profile'))}>Confirm</button>
            </>
          :null}
        </div>

        <div id='email-profile'>
          <label>E-Mail</label>
          <input className='readonly-field' readOnly={true} name="email"  type="email" value={email} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('email-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('email-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('email-profile'))}>Confirm</button>  
            </>
          :null}
        </div>

        <div id='phone-profile'>
        <label>Telephone</label>
          <input className='readonly-field' readOnly={true} name="phone" type="text" value={phone} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('phone-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('phone-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('phone-profile'))}>Confirm</button>
            </>
          :null}        
        </div>
        
        <div id='opening-profile'>
          <label>Opening time</label>
          <input className='readonly-field' readOnly={true} name="city" type="text" value={openingTime} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('opening-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('opening-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('opening-profile'))}>Confirm</button>
            </>
          :null}
        </div>
        
        <div id='closing-profile'>
          <label>Opening time</label>
          <input className='readonly-field' readOnly={true} name="city" type="text" value={closingTime} onChange={this.handleChange}></input>
          {(this.props.loggedInUser._id=== this.props.match.params.doctorId)?
            <>
              <button onClick={()=>this.handleEnable(document.getElementById('closing-profile'))}>Edit</button>
              <button className='hidden-button' onClick={()=>this.handleDisable(document.getElementById('closing-profile'))}>Cancel</button>
              <button type='submit' className='hidden-button' onClick={() => this.handleEdit(this.state.updatedField, document.getElementById('closing-profile'))}>Confirm</button>
            </>
          :null}
        </div>

        

          {/*Calendar  */}
          {(this.props.usertype==='patient') ? 
           <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek, timeGridDay'
              }}
              initialView='timeGridWeek'
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              allDaySlot= {false}
              eventDurationEditable={false}
              slotMinTime= '08:00'
              slotMaxTime= '20:00'
              businessHours = {{businessHours: {
                  daysOfWeek: [ 1, 2, 3, 4, 5 ], 
                  startTime: this.state.doctor.openingTime, 
                  endTime: this.state.doctor.closingTime, 
                }}}
              weekends={this.state.weekendsVisible}
              events={this.state.events} 
              select={this.handleDateSelect}
              eventContent={renderEventContent} 
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} 
              eventAdd={(event)=>this.appoCreate(event)}
              eventChange={(event)=>this.appoEdit(event)}
              eventRemove={(event)=>this.appoCancel(event)}
            />
            :null}
          
         
          
        </div>

        
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
  