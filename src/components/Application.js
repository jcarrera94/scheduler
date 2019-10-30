import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Juan Carrera",
      interviewer: {
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Conner Lopez",
      interviewer: {
        id: 2, 
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: "last",
    time: "5pm"
  }
];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('api/days')
    .then(res => setDays(res.data))
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, []);


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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appoinment => {
          return (
            <Appointment 
              key={appoinment.id}
              {...appoinment}
            />
          )
        })}
      </section>

    </main>
  );
};