import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./styles.module.css";
import EarringTable from "../EarringTable";

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
      <h4>Aretes Registrados</h4>
      <EarringTable />
    </div>
  );
}
