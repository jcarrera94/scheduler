export function getAppointmentsForDay(state, day) {
  const result = [];
  if (!day) {
    return result;
  }
  let filteredDay = state.days.filter(each => each.name === day);
  if (!filteredDay.length) {
    return result;
  }
  filteredDay[0].appointments.forEach(id => {
    if(state.appointments[id]) {
      result.push(state.appointments[id]);
    }
  })
  return result;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  if (!day) {
    return result;
  }
  let filteredDay = state.days.filter(each => each.name === day);
  if (!filteredDay.length) {
    return result;
  }
  filteredDay[0].interviewers.forEach(id => {
    if(state.interviewers[id]) {
      result.push(state.interviewers[id]);
    }
  })
  return result;
}

export function getInterview(state, interview) {
  let result = null;
  if (!interview) {
    return result;
  }
  result = interview;
  result.interviewer = state.interviewers[typeof interview.interviewer === 'number' ? interview.interviewer : interview.interviewer.id];
  return result;
}