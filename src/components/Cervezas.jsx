import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "../assets/data.json";
/* function prueba() {
  useEffect(() => {
    fetch("../assets/data.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
} */
const Cervezas = () => {
  const [count, setCount] = useState([]);
  useEffect(async () => {
    const res = await fetch("../assets/data.json");
    const resJ = await res.json();
    console.log(resJ);
    /* fetch("../assets/data.json")
      .then((response) => response.json())
      .then(() => console.log(count))
      .then((x) => setCount(x)); */
  });
  return <div>hola soy las cervezas</div>;
};

export default Cervezas;
