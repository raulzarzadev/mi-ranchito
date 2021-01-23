import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./styles.module.css";

export default function NewEarring({ handleAddEarring, earrings }) {
  const today = moment().format("YYYY-MM-DD");
  const [newEarring, setNewEarring] = useState({
    birth: today,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setNewEarring({ ...newEarring, [e.target.name]: e.target.value });
    setLabelButton("Guardar");
  };

  const existedEarring = earrings.map((earring) => earring.earring);
  const alreadyExist = existedEarring.includes(newEarring.earring);

  const handleSubmit = (form) => {
    handleAddEarring(form);
    setNewEarring({ birth: today });
    setLabelButton("Guardado");
  };

  const [labelButton, setLabelButton] = useState("Guardar");

  let valid = alreadyExist || !!!newEarring?.earring;

  console.log(newEarring);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(newEarring);
      }}
    >
      <div>
        <div>
          <div className={styles.item}>
            <span>
              No. de Arete:
              <input
                style={{ width: "150px" }}
                type="text"
                placeholder="Arete No."
                name="earring"
                value={newEarring?.earring || ""}
                onChange={handleChange}
              ></input>
            </span>
            <div>
              <em>{alreadyExist && "Este arete ya está registrado"}</em>
            </div>
          </div>
          <div className={styles.item}>
            <span>
              Nombre:{" "}
              <input
                style={{ width: "150px" }}
                value={newEarring?.name || ""}
                type="text"
                placeholder="Nombre (opcional)"
                name="name"
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <span>
              Nacimiento:
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
            <button type="submit" disabled={valid}>
              {labelButton}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
