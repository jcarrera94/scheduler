import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  let [name, setName] = useState(props.name || "");
  let [interviewerId, setInterviewerId] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = () => {
    setName("");
    setInterviewerId(null);
    // setError('');
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError('');
    props.onSave(name, interviewerId, props.isSave)
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        {/* <div style={{color:'red'}}>{props.error}</div> */}
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewerId}
          onChange={(id) => setInterviewerId(id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}