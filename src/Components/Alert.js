import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    if(word==="danger")
    {
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    // here height is helpful in fixing the layout movement due to alert
    <div style={{ height: "50px" }}>  
      {props.alert && (
        <div className={`alert alert-${props.alert.typ}`} role="alert">
          <strong>{capitalize(props.alert.typ)}</strong> : {props.alert.msg}
        </div>
      )}
    </div>
  );
}
