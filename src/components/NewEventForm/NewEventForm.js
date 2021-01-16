import React from "react";
import styles from "./styles.module.css";

export default function NewEventForm({
  handleChange,
  handleSubmit,
  form,
  earrings,
}) {
  return (
    <div>
      <div>
        <h3>Nuevo evento</h3>
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
              <select onChange={handleChange} name="earring" id="select-animal">
                <option value="des" disabled selected>
                  Arete No.
                </option>
                {earrings.map((earring, i) => (
                  <option key={i} value={earring.number}>
                    {earring.earring} {earring?.nickName}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.event_form__input}>
              <select
                onChange={handleChange}
                name="event"
                id="select-animal"
                placeholder="Selecciona una vaca"
              >
                <option value="des" disabled selected>
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
