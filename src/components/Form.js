import React from "react";

const Form = props => {
  return (
    <form onSubmit={props.buttonHandle}>
      <input
        type="text"
        value={props.text}
        onChange={props.inputHandle}
        placeholder="Enter city"
      />
      <button>Search</button>
    </form>
  );
};

export default Form;
