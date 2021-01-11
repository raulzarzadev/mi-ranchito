import React from "react";
import styles from "./styles.module.css";

export default function NewEventForm({ handleChange, handleSubmit, form }) {
  return (
    <div>
      <div>
        <h1>Nuevo evento</h1>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div className={styles.event_form}>
            <div className={styles.event_form__input}>
              <select onChange={handleChange} name="arete" id="select-animal">
                <option value="" disabled selected>
                  Arete No.
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </select>
            </div>
            <div className={styles.event_form__input}>
              <select
                onChange={handleChange}
                name="name"
                id="select-animal"
                placeholder="Selecciona una vaca"
              >
                <option value="" disabled selected>
                  Evento
                </option>
                <option value="parto">parto</option>
                <option value="servicio">servicio</option>
                <option value="celo">celo</option>
              </select>
            </div>
            <div className={styles.event_form__input}>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                id="event-date"
                value={form.date}
              />
            </div>
            <div className={styles.event_form__input}>
              <button type="submit">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
