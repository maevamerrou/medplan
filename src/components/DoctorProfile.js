import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId, INITIAL_EVENTS } from './event-utils'
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
        this.setState({doctor: res.data})
      })
      axios.get(`${API_URL}/doctor/appointments/${this.props.match.params.doctorId}`, {withCredentials: true})
      .then((res)=>{
        this.setState({appointments: res.data, events: res.data.map(appointment=>{return {title: appointment.reason, start:appointment.time, id:appointment.eventId, editable: false}})}) 
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
    for (let button of buttons){button.classList.toggle('hidden-button')}
  }

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
        editable: true,
      })
    }}
    else{
      selectInfo.view.calendar.unselect()
      alert('Please, select a valid date')
    }
  }
  
  
  handleEventClick = (clickInfo) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
  }
    
  
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
      const {username, speciality, city, address, email, phone} = this.state.doctor
  
      return (
        //Profile
        <div>
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


          {/*Calendar  */}
          <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek'
              }}
              initialView='timeGridWeek'
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              slotMinTime= '09:00'
              slotMaxTime= '19:00'
              businessHours = {{
                // days of week. an array of zero-based day of week integers (0=Sunday)
                daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday

                startTime: '10:00', // a start time (10am in this example)
                endTime: '18:00', // an end time (6pm in this example)
              }}
              weekends={this.state.weekendsVisible}
              events={this.state.events} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              //  you can update a remote database when these fire:
              eventAdd={(event)=>this.appoCreate(event)}
              eventChange={(event)=>this.appoEdit(event)}
              eventRemove={(event)=>this.appoCancel(event)}
              duration= '00:30'
              eventConstraint='businessHours'
              selectConstraint='businessHours'
            />
          
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
  