import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'
import {API_URL} from '../config'
import momentPlugin from '@fullcalendar/moment'
export default class DoctorCalendar extends Component {
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
        axios.get(`${API_URL}/doctor/${this.props.loggedInUser._id}`, {withCredentials: true})
          .then((res)=>{
            this.setState({doctor: res.data}, ()=>{console.log(this.state.doctor, new Date(this.state.doctor.openingTime))})
          })
          axios.get(`${API_URL}/doctor/appointments/${this.props.loggedInUser._id}`, {withCredentials: true})
          .then((res)=>{
            this.setState({appointments: res.data, events: res.data.map(appointment=>{return {title: appointment.reason, start:appointment.time, id:appointment.eventId, editable: false, patient: appointment.patient, appointment: appointment._id}})}, ()=>console.log(this.state)) 
          })
      }
      handleEventClick = (clickInfo) => {
          console.log (clickInfo)
        this.props.history.push(`/calendar/${clickInfo.event.extendedProps.appointment}`)
      }
      handleEvents = (events) => {
        this.setState({
          currentEvents: events
        })
      }
    render() {
        return (
          <>
            <h1>Calendar</h1>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin]}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next'
            }}
<<<<<<< HEAD
            // titleFormat = 'Do MMM YYYY'
=======
            titleFormat = 'DD/MM/YYYY'
>>>>>>> origin/rafael
            initialView='timeGridDay'
            selectMirror={true}
            dayMaxEvents={true}
            allDaySlot= {false}
            eventDurationEditable={false}
            slotMinTime= '08:00'
            slotMaxTime= '20:00'
            businessHours = {{businessHours: {
                // days of week. an array of zero-based day of week integers (0=Sunday)
                daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
                startTime: this.state.doctor.openingTime, // a start time (10am in this example)
                endTime: this.state.doctor.closingTime, // an end time (6pm in this example)
              }}}
            weekends={this.state.weekendsVisible}
            events={this.state.events} // alternatively, use the `events` setting to fetch from a feed
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            defaultTimedEventDuration= '00:30'
            />
          </>
        )
    }
}
function renderEventContent(eventInfo) {
    console.log (eventInfo.event)
    return (
      <div className='event-content'>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.extendedProps.patient.username}</i>
        <i>{eventInfo.event.title}</i>
        </div>
    )
  }