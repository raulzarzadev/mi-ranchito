import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./styles.module.css";

export default function EarringData({ earrings, events = [] }) {
  const [sortedEvents, setSortedEvents] = useState([]);
  const [showDetails, setShowDetails] = useState("");

  const getAge = (birth) => {
    console.log();
    return moment(birth).fromNow(true);
  };

  const handleShowDetails = (earring) => {
    showDetails === earring ? setShowDetails("") : setShowDetails(earring);
  };

  const [sortBy, setSortBy] = useState("eventCheckDate");

  switch (sortBy) {
    case "eventType":
      events.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      break;
    case "eventCreate":
      events.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      });
      break;
    case "eventCheckType":
      events.sort((a, b) => {
        if (a.nextEvent.name > b.nextEvent.name) {
          return 1;
        }
        if (a.nextEvent.name < b.nextEvent.name) {
          return -1;
        }
        return 0;
      });
      break;
    case "eventCheckDate":
      console.log("by check date");
      events.sort((a, b) => {
        if (a.nextEvent.date > b.nextEvent.date) {
          return 1;
        }
        if (a.nextEvent.date < b.nextEvent.date) {
          return -1;
        }
        return 0;
      });
      break;

    default:
      break;
  }

  useEffect(() => {
    setSortedEvents(events);
  }, [events]);
  console.log(sortedEvents);

  const eventsByEarring = (earring) => {
    const res = sortedEvents.filter((event) => event.earring === earring);
    return res;
  };

  function handleSortEventByName() {
    const newEventList = events.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return newEventList;
  }

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
                <div className={styles.earring_cell}>
                  {getAge(earring.birth)}
                </div>
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
                      <div onClick={() => setSortBy("eventType")}>
                        <h5>Evento</h5>
                      </div>
                    </div>
                    <div className={styles.history_cell}>
                      <div onClick={() => setSortBy("eventCreate")}>
                        <h5>Fecha</h5>
                      </div>
                    </div>
                    <div className={styles.history_cell}>
                      <div onClick={() => setSortBy("eventCheckType")}>
                        <h5>Revisar</h5>
                      </div>
                    </div>
                    <div className={styles.history_cell}>
                      <div onClick={() => setSortBy("eventCheckDate")}>
                        <h5>Fecha</h5>
                      </div>
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
                            {event.formatDate}
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
