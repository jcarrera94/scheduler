import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (day) => setState({...state, day});
  // const setDays = (days) => setState(prev => ({...prev, days}));

  useEffect(() => {
    Promise.all([
    axios.get('api/days'),
    axios.get('api/appointments'),
    axios.get('api/interviewers')
    ])
    .then(all => {
      setState({...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
    })
    .catch((error) => {
      console.log(error);
      // console.log(error.response.headers);
      // console.log(error.response.data);
    });
  }, []);
  
  let apts = getAppointmentsForDay(state, state.day);
  console.log("this is apts", apts)
  // let interview = 

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apts.map(appointment => {
          return (
            <Appointment 
              key={appointment.id}
              time={appointment.time}
              interview={getInterview(state, appointment.interview)}
            />
          )
        })}
      </section>

    </main>
  );
};