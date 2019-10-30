import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  let [state, setState] = useState(props.interviewer);

  let update = (id) => {
    setState(id);
    props.setInterviewer(id);
  }

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
              selected={interviewer.id === state}
              // setInterviewer={() => setState(interviewer.id)}
              // onClick={() => setState(interviewer.id)}
              onClick={() => update(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

