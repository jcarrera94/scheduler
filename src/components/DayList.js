import React from "react";
import DaylistItem from "components/DayListItem";

export default function Daylist(props) {
  return props.days.map((day) => {
    return (
      <ul>
        <DaylistItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay} />
      </ul>
    )
  })
}