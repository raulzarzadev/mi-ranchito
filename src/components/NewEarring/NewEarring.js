import React, { useState } from "react";
import moment from "moment";
import styles from "./styles.module.css";

export default function NewEarring() {
  const [newEarring, setNewEarring] = useState({
    birth: moment().format("YYYY-MM-DD"),
  });
  const handleChange = (e) => {
    setNewEarring({ ...newEarring, [e.target.name]: e.target.value });
  };
  const handleSubmit = (form) => {
    console.log(form);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(newEarring);
      }}
    >
      <div>
        <div>
          <h3>Nueva Vaca</h3>
        </div>
        <div>
          <div className={styles.item}>
            <span>
              No. de Arete:{" "}
              <input
                style={{ width: "150px" }}
                type="text"
                placeholder="Arete No."
                name="earring"
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <span>
              Nombre:{" "}
              <input
                style={{ width: "150px" }}
                type="text"
                placeholder="Nombre (opcional)"
                name="name"
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <span>
              Nacimiento:{" "}
              <input
                style={{ width: "150px" }}
                type="date"
                placeholder="Fecha de Nacimiento"
                name="birth"
                value={newEarring.birth}
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <button type="submit">Guardar Vaca</button>
          </div>
        </div>
      </div>
    </form>
  );
}
