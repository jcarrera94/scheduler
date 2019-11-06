import { useEffect, useReducer } from "react";
import axios from "axios";
import { reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application"


export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const checkDay = (id) => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
  }

  const bookInterview = (id, interview, create = false) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = state.days.map( day => {
      return (create ? day.id === checkDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
    });
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = state.days.map( day => {
      return (day.id === checkDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
    });
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}