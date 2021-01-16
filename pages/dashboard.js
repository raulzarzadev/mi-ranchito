import Head from "next/head";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../src/components/Layout";
import NewEventForm from "../src/components/NewEventForm";
import UpcomingEvents from "../src/components/UpcomingEvents";
import EventsHistory from "../src/components/EventsHistory";
import EarringTable from "../src/components/EarringTable";
import { EARRINGS, EVENTS } from "../src/components/HARD_DATA";
import { getToday } from "../src/utils";

const EARRING_DATA = EARRINGS;
const EVENTS_HISTORY = EVENTS;

moment.locale("es");

export default function Dashboard() {
  //TODO llamar desde la BD evetnos mayores a la fecha del dia de hoy y en orden ascendente

  const [earringsData, setEarringsData] = useState(EARRINGS);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    date: getToday(),
    earring: "",
    event: "",
  });

  const formatEvent = (event) => {
    const eventFormatDate = moment(event.date)
      .add(12, "hours")
      .format("DD MMMM")
      .slice(0, 6);
    const eventDate = new Date(event.date);
    let nextCheck;
    let nextEvent;
    switch (event.event) {
      case "parto":
        nextEvent = "Secado";
        nextCheck = moment(event.date).add(12, "hours").add(7, "months");
        break;
      case "celo":
        nextEvent = "Celo";
        nextCheck = moment(event.date).add(12, "hours").add(21, "d");
        break;
      case "servicio":
        nextEvent = "Preña";
        nextCheck = moment(event.date).add(12, "hours").add(21, "d");
        break;
      default:
        break;
    }
    const formatedEvent = {
      earring: event.earring,
      event: event.event,
      date: eventDate,
      formatDate: eventFormatDate,
      nextEvent: {
        date: new Date(nextCheck),
        label: nextEvent,
        formatDate: nextCheck?.format("DD MMMM").slice(0, 6),
      },
    };
    return formatedEvent;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setEvents([...events, form]);
  };

  const [formatedEvents, setFormatedEvents] = useState(
    events.map((event) => formatEvent(event))
  );

  useEffect(() => {
    setFormatedEvents(events.map((event) => formatEvent(event)));
  }, [events]);

  console.log(formatedEvents);
  console.log(form);

  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <NewEventForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        earrings={earringsData}
      />
      <UpcomingEvents events={formatedEvents} />
      <EventsHistory events={formatedEvents} />
      <EarringTable events={formatedEvents} earrings={earringsData} />
      {/*
       */}
    </>
  );
}

Dashboard.Layout = Layout;
