import React, { Component,useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import DateTimePicker from 'react-datetime-picker';
import Calendar from 'react-awesome-calendar';
import Lottie from 'react-lottie';
import animationData from "../../lottie/43885-laptop-working.json";

import "react-datepicker/dist/react-datepicker.css";
import { MDBBtn, MDBBox, MDBCard, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";
// import "./index.css";

// ---------------
const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		// preserveAspectRatio: "xMidYMid slice"
	}
};
const InitEvents = [
  {
    id: 1,
    date: "2021-09-12",
    time: "10:00",
    from: "2021-09-12T09:00+00:00",
    to: "2021-09-12T12:00+00:00",
    color: '#3694DF',
    title: "Paste Room RH SENSOR and AHU Duct Flow Check",
    location: "PASTE ROOM",
    description: "Irreguar RH Reading reported in IOT Platform on 24-08-2021"
  }
]
const MaintScehduler = () => {
  const [events,setEvents] = useState([]);
  const [modal,setModal] = useState(false);
  const [inputEvent, setEvent] = useState({datetimeFrom:new Date(),datetimeTo:new Date(),
                                           title:null,location:null,description:null});
  const [startDate, setDate] = useState(new Date)
  const [rangeStart, setRangeStart] = useState(new Date)
  const [showHideEvent, setAddEvent] = useState(false);
  const defaultEndDate = new Date()
  defaultEndDate.setDate(defaultEndDate.getDate() + 7)
  const [rangeEnd, setRangeEnd] = useState(defaultEndDate)
  const today = new Date()
  // ---------------------  
  const selectDateHandler = (d) => {
    setDate(d)
  }
  const selectStartDate = d => {
    setRangeStart(d)
  }
  const selectEndDate = d => {
    setRangeEnd(d)
  }
  const onHandleAddEvent = () => {
    setAddEvent(!showHideEvent);
  }
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEvent({ ...inputEvent, [name]: value });
  }
  const addEvent = (e) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const { datetimeFrom,datetimeTo,title,location,description} = inputEvent;
    const _dateFrom = datetimeFrom.toLocaleDateString('fr-CA', options);
    const _timeFrom = datetimeFrom.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 
    const _dateTo   = datetimeTo.toLocaleDateString('fr-CA', options);
    const _timeTo   = datetimeTo.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 
    // -----------
    if (inputEvent.datetimeFrom && inputEvent.datetimeTo && inputEvent.title && 
        inputEvent.location && inputEvent.description) {
      console.log(_dateFrom,_timeFrom,_dateTo,_timeTo,title,location,description)
      const newEvent = {
        id: events.length + 1,
        date : _dateFrom,
        time: _timeFrom,
        from: `${_dateFrom}T${_timeFrom}+00:00`,
        to: `${_dateTo}T${_timeTo}+00:00`,
        color: '#3694DF',
        title: title,
        location: location,
        description: description
      }
      console.log(newEvent);
      events.push(newEvent);
      setEvent(events);
      console.log(events);
    }
  }
  // ------
  return (
    <main style={{ marginTop: '6rem' }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="9" className="mb-r">
            <Calendar events={events}/>
            <h2 className="text-uppercase my-3">Today:</h2>
            <div id="schedule-items">
              {events.map(event => (
                <Event
                  key={event.id}
                  id={event.id}
                  date={event.date}
                  time={event.time}
                  title={event.title}
                  location={event.location}
                  description={event.description}
                />
              ))}
            </div>
          </MDBCol>
          <MDBCol md="3">
            <hr/>
            <div>
              <MDBBtn stcolor="white" size="lg" className='center w-100' onClick={()=>onHandleAddEvent()}>SHOW/HIDE ADD EVENT</MDBBtn>
              {
                showHideEvent && (
                  <div className='center p-2'>
                    <h6>EVENT DATE FROM
                    <DateTimePicker calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value" dayAriaLabel="Day" hourAriaLabel="Hour"
                      minuteAriaLabel="Minute"
                      nativeInputAriaLabel="Date and time"  
                      yearAriaLabel="Year"
                      value={inputEvent.datetimeFrom}
                      onChange={(e)=>setEvent({datetimeFrom:e,datetimeTo:inputEvent.datetimeTo})}/>
                      EVENT DATE END
                    <DateTimePicker calendarAriaLabel="Toggle calendar"
                      clearAriaLabel="Clear value" dayAriaLabel="Day" hourAriaLabel="Hour"
                      minuteAriaLabel="Minute"
                      nativeInputAriaLabel="Date and time"  
                      yearAriaLabel="Year"
                      value={inputEvent.datetimeTo}
                      onChange={(e)=>setEvent({datetimeFrom:inputEvent.datetimeFrom,datetimeTo:e})}/></h6>
                    <MDBCard className="p-2 my-4 w-80" style={{ width: "14rem" }}>
                      {/* <h6>START DATE TIME : {inputEvent.datetimeFrom}</h6> */}
                      {/* <h6>END   DATE TIME : {inputEvent.datetimeTo}</h6> */}
                      <h6>TITLE
                        <input type='text' placeholder='TITLE' className="form-control" 
                              name='title' onChange={onChange}/></h6>
                      <div>
                        <h6>LOCATION/COMPONENTS
                          <input  type='text' placeholder='Location' 
                                  className="form-control" name='location'  onChange={onChange}/></h6>
                      </div>
                      <h6>DESCRIPTION
                          <input type='text' placeholder='DESCRIPTION' 
                                className="form-control" name='description' onChange={onChange} /></h6>
                      <MDBBtn color='primary' size="lg"className='center' 
                              onClick={addEvent} >ADD NEW EVENT</MDBBtn>
                    </MDBCard >
                  </div>)
              }
            </div>
            <hr />
            <h4 className="text-uppercase text-center my-3">Schedule</h4>
            <h6 className="my-3">
              It's going to be busy that today. You have{" "}
              <b>{events.length} events </b> today.
            </h6>
            <hr />
            <h4 className="my-3">
              <MDBRow>
                <MDBCol size="3" className="text-center">
                  <MDBIcon icon="sun" fixed />
                </MDBCol>
                <MDBCol size="6">Sunny</MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="3" className="text-center">
                <MDBIcon icon="thermometer-three-quarters" fixed />                  
                </MDBCol>
                <MDBCol size="6">23°C</MDBCol>
              </MDBRow>

            </h4>
            <hr />
            <h4 className="text-uppercase text-center my-3">HIGHLIGHT</h4>
            
              <Lottie options={defaultOptions} height={200} width={200} />

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </main>
  )
}

class Event extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="media mt-1">
          <div>
            <h3 className="h3-responsive font-weight-bold mr-3">{this.props.date}</h3>
            <h3 className="h3-responsive font-weight-bold mr-3">{this.props.time}</h3>
          </div>
          <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
              color="danger"
              className="ml-2 float-right"
              onClick={() => this.props.onDelete(this.props.id)}
            >X</MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />

            {this.props.location && (
              <React.Fragment>
                <p className="font-smaller mb-0">
                  <MDBIcon icon="location-arrow" /> {this.props.location}
                </p>
              </React.Fragment>
            )}
            <hr className="hr-bold my-2" />
            
            {this.props.description && (
              <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                {this.props.description}
              </p>
            )}

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MaintScehduler;