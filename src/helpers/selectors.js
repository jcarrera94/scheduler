

export function getAppointmentsForDay (state, day) {
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