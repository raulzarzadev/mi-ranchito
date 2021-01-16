import moment from "moment";
import React, { useEffect, useState } from "react";
import { getToday } from "../../utils";
import EventRow from "../EventRow";
import EventTable from "../EventTable";
import SelectedTitle from "../SelectedTitle";
import styles from "./styles.module.css";

export default function UpcomingEvents({ events }) {
  const [range, setRange] = useState("week");
  let upcomingEvents = events.filter(
    (event) =>
      event.nextEvent.date > moment().subtract(1, "week") &&
      event.nextEvent.date < moment().add(2, range)
  );
  console.log(upcomingEvents);

  const handleChangeRange = (range) => {
    setRange(range);
    upcomingEvents = events.filter(
      (event) =>
        event.nextEvent.date > moment().subtract(1, "week") &&
        event.nextEvent.date < moment().add(2, range)
    );
  };
  return (
    <>
      {upcomingEvents.length === 0 ? (
        <>
          <h5>No hay eventos proximos</h5>
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <SelectedTitle
              onClick={() => handleChangeRange("month")}
              selected={range === "month"}
              title="2 meses"
            />
            <SelectedTitle
              onClick={() => handleChangeRange("week")}
              selected={range === "week"}
              title="2 semanas"
            />
          </div>
          <EventTable
            title="Proximos..."
            events={upcomingEvents}
            sortByNextEvent
          />
        </>
      )}
    </>
  );
}