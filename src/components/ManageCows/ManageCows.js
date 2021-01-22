import React, { useEffect, useState } from "react";
import { formatEvent } from "../../utils";
import EarringTable from "../EarringTable";
import EventsHistory from "../EventsHistory";
import NewEarring from "../NewEarring";
import NewEventForm from "../NewEventForm";
import UpcomingEvents from "../UpcomingEvents";
import { ALL_EVENTS, EARRINGS, EVENTS_LABEL } from "../HARD_DATA";
import styles from "./styles.module.css";

export default function ManageCows() {
  const eventsAvaiblable = ALL_EVENTS;
  const eventLabels = EVENTS_LABEL;
  const [earringsData, setEarringsData] = useState(EARRINGS);
  const [events, setEvents] = useState([]);

  const [formatedEvents, setFormatedEvents] = useState(
    events.map((event) => formatEvent(event))
  );

  const [tabSelected, setTabSelected] = useState("PROX");

  useEffect(() => {
    setFormatedEvents(events.map((event) => formatEvent(event, eventLabels)));
  }, [events]);

  const handleChangeTab = (tab) => {
    setTabSelected(tab);
  };

  const handleAddEarring = (newEarring) => {
    setEarringsData([...earringsData, newEarring]);
  };
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <div>
        <div className={styles.demo}>
          <div
            className={
              tabSelected === "COW" ? styles.demo_tab : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab("COW")}
          >
            <h4>Nueva Vaca</h4>
          </div>
          <div
            className={
              tabSelected === "EVENT"
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab("EVENT")}
          >
            <h4>Nuevo evento</h4>
          </div>
          <div
            className={
              tabSelected === "PROX"
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab("PROX")}
          >
            <h4>Proximamente</h4>
          </div>
          <div
            className={
              tabSelected === "HIST"
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab("HIST")}
          >
            <h4>Eventos</h4>
          </div>
          <div
            className={
              tabSelected === "ALL" ? styles.demo_tab : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab("ALL")}
          >
            <h4>Vacas</h4>
          </div>
        </div>

        <div
          className={styles.demo_display}
          style={{ display: tabSelected === "COW" ? "block" : "none" }}
        >
          <NewEarring handleAddEarring={handleAddEarring} />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === "EVENT" ? "block" : "none" }}
        >
          <NewEventForm
            handleSubmit={handleAddEvent}
            eventsAvaiblable={eventsAvaiblable}
            earrings={earringsData}
          />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === "PROX" ? "block" : "none" }}
        >
          <UpcomingEvents events={formatedEvents} />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === "HIST" ? "block" : "none" }}
        >
          <EventsHistory events={formatedEvents} />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === "ALL" ? "block" : "none" }}
        >
          <EarringTable events={formatedEvents} earrings={earringsData} />
        </div>
      </div>
    </div>
  );
}
