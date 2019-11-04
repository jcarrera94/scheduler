import React, { useState } from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
  // let [state, setState] = useState(props.value);

  // let update = (id) => {
  //   setState(id);
  //   props.onChange(id);
  // }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.value}
              onClick={() => props.onChange(interviewer.id)}
              // onClick={() => setState(interviewer.id)}
              // onClick={() => update(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

