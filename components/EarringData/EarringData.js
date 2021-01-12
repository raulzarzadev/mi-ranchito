import React, { useState } from "react";
import moment from "moment";
import styles from "./styles.module.css";
import ButtonLink from "../ButtonLink";
import EventRow from "../EventRow";
export default function EarringData({ earrings, events = [] }) {
  const age = (birth) => {
    var years = moment().diff(moment(birth, "DD-MM-YYYY"), "years");
    return years;
  };
  console.log();
  const [showDetails, setShowDetails] = useState("");
  const handleShowDetails = (earring) => {
    console.log();
    showDetails === earring ? setShowDetails("") : setShowDetails(earring);
  };

  const eventsByEarring = (earring) => {
    const res = events.filter((event) => event.earring === earring);

    return res;
  };
  return (
    <div>
      <h1>Aretes Registrados</h1>
      <div className={styles.earring_grid}>
        <div className={styles.earring_row}>
          <div className={styles.earring_cell}>
            <h5>Arete</h5>
          </div>
          <div className={styles.earring_cell}>
            <h5>Nombre</h5>
          </div>
          <div className={styles.earring_cell}>
            <h5>Edad</h5>
          </div>
          <div className={styles.earring_cell}>
            <h5>Acciones</h5>
          </div>
        </div>
        <div className={styles.earring_box}>
          {earrings.map((earring) => (
            <>
              <div className={styles.earring_row}>
                <div className={styles.earring_cell}>{earring.number}</div>
                <div className={styles.earring_cell}>
                  {earring.nickName || "vaca"}
                </div>
                <div className={styles.earring_cell}>{age(earring.birth)}</div>
                <div
                  className={styles.earring_cell}
                  onClick={() => handleShowDetails(earring.number)}
                >
                  {showDetails !== earring.number ? "ver" : "ocultar"}
                </div>
              </div>
              <div
                className={styles.earring_history}
                style={{ display: showDetails !== earring.number && "none" }}
              >
                <div>
                  <h4>Eventos</h4>
                  <div className={styles.hisotry_row}>
                    <div className={styles.history_cell}>
                      <h5>Evento</h5>
                    </div>
                    <div className={styles.history_cell}>
                      <h5>Fecha</h5>
                    </div>
                    <div className={styles.history_cell}>
                      <h5>Revisar</h5>
                    </div>
                    <div className={styles.history_cell}>
                      <h5>Fecha</h5>
                    </div>
                  </div>
                  {eventsByEarring(earring.number).length === 0 ? (
                    <h5>No hay eventos aun</h5>
                  ) : (
                    <>
                      {eventsByEarring(earring.number).map((event) => (
                        <div className={styles.hisotry_row}>
                          <div className={styles.hisotry_cell}>
                            {event.name}
                          </div>
                          <div className={styles.hisotry_cell}>
                            {event.date}
                          </div>
                          <div className={styles.hisotry_cell}>
                            {event.nextEvent?.label}
                          </div>
                          <div className={styles.hisotry_cell}>
                            {event.nextEvent?.formatDate}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
