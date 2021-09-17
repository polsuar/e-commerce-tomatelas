import * as react from "react";

export const useInput = (name,product) => {
  const [value, setValue] = react.useState("");

  const onChange = ({ target: { value } }) => setValue(value);

  // desestructura el value del target (event)
  return { value, onChange, name };
};
