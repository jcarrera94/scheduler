import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import classnames from "classnames";

export default function InterviewerList(props) {
  return props.interviewers.map(interviewer => {
    let interviewerListClass = "interviewers"
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });
}

