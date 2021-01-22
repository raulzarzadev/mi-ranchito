import React, { useState } from "react";
import { getToday } from "../../utils";
import styles from "./styles.module.css";

export default function NewEventForm({
  handleSubmit = () => console.log("submit"),
  earrings = [],
  eventsAvaiblable = [],
}) {
  const [form, setForm] = useState({
    date: getToday(),
    earring: "",
    event: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
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
                    defaultValue=""
                  >
                    <option value="" disabled>
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
                    defaultValue=""
                    id="select-animal"
                    placeholder="Selecciona una vaca"
                  >
                    <option value="" disabled>
                      Evento
                    </option>
                    {eventsAvaiblable.map((event, i) => (
                      <option key={i} value={event.type}>
                        {event.label}
                      </option>
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
