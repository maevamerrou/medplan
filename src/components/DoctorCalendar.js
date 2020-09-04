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
            this.setState({doctor: res.data})
          })
          axios.get(`${API_URL}/doctor/appointments/${this.props.loggedInUser._id}`, {withCredentials: true})
          .then((res)=>{
            this.setState({appointments: res.data, events: res.data.map(appointment=>{return {title: appointment.reason, start:appointment.time, id:appointment.eventId, editable: false, patient: appointment.patient, appointment: appointment._id}})}) 
          })
      }
      handleEventClick = (clickInfo) => {
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
            titleFormat = 'DD/MM/YYYY'
            initialView='timeGridDay'
            selectMirror={true}
            dayMaxEvents={true}
            allDaySlot= {false}
            eventDurationEditable={false}
            slotMinTime= '08:00'
            slotMaxTime= '20:00'
            businessHours = {{businessHours: {
                daysOfWeek: [ 1, 2, 3, 4, 5 ], 
                startTime: `${this.state.doctor.openingTime}`,
                endTime: this.state.doctor.closingTime,
              }}}
            weekends={this.state.weekendsVisible}
            events={this.state.events} 
            eventContent={renderEventContent} 
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} 
            defaultTimedEventDuration= '00:30'
            />
            
          </>
        )
    }
}
function renderEventContent(eventInfo) {
    return (
      <div className='event-content'>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.extendedProps.patient.username}</i>
        <i>{eventInfo.event.title}</i>
        </div>
    )
  }