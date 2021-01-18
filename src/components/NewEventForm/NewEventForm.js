import React from "react";
import styles from "./styles.module.css";

export default function NewEventForm({
  handleChange,
  handleSubmit,
  form,
  earrings,
  eventsAvaiblable,
}) {
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div>
            <div>
              <h3>Nuevo evento</h3>
            </div>
            <div>
              <div className={styles.event_form__input}>
                <span>
                  Vaca:{" "}
                  <select
                    style={{ width: 150 }}
                    onChange={handleChange}
                    name="earring"
                    id="select-animal"
                  >
                    <option value="des" disabled selected>
                      Arete No.
                    </option>
                    {earrings.map((earring, i) => (
                      <option key={i} value={earring.earring}>
                        {earring.earring} {earring?.nickName}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className={styles.event_form__input}>
                <span>
                  Evento:{" "}
                  <select
                    style={{ width: 150 }}
                    onChange={handleChange}
                    name="event"
                    id="select-animal"
                    placeholder="Selecciona una vaca"
                  >
                    <option value="des" disabled selected>
                      Evento
                    </option>
                    {eventsAvaiblable.map((event) => (
                      <option value={event.type}>{event.label}</option>
                    ))}
                  </select>
                </span>
              </div>
              <div className={styles.event_form__input}>
                <span>
                  Fecha:{" "}
                  <input
                    style={{ width: 150 }}
                    onChange={handleChange}
                    type="date"
                    name="date"
                    id="event-date"
                    value={form.date}
                  />
                </span>
              </div>
              <div className={styles.event_form__input}>
                <button type="submit">Guardar Evento</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
