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
    let nextCheck;
    let nextEvent;

    switch (event.event) {
      case "parto":
        nextEvent = "celo";
        nextCheck = moment(event.date).add(12, "hours").add(70, "d");
        break;
      case "celo":
        nextEvent = "celo";
        nextCheck = moment(event.date).add(12, "hours").add(21, "d");
        break;
      case "monta":
        nextEvent = "gesta";
        nextCheck = moment(event.date).add(12, "hours").add(80, "d");
        break;
      case "insem":
        nextEvent = "gesta";
        nextCheck = moment(event.date).add(12, "hours").add(80, "d");
        break;
      case "gestaFail":
        nextEvent = "celo";
        nextCheck = moment(event.date).add(12, "hours").add(21, "d");
        break;
      case "gestaSuccess":
        nextEvent = "secado";
        nextCheck = moment(event.date).add(12, "hours").add(140, "d");
        break;
      case "secado":
        nextEvent = "parto";
        nextCheck = moment(event.date).add(12, "hours").add(90, "d");
      default:
        break;
    }

    const eventFormatDate = moment(event.date)
      .add(12, "hours")
      .format("DD MMMM")
      .slice(0, 6);
    const nextEventFormatDate = nextCheck?.format("DD MMMM").slice(0, 6);
    const eventDate = new Date(event.date);
    const nextEventDate = new Date(nextCheck);

    const formatedEvent = {
      earring: event.earring,
      type: event.event,
      label: EVENTS_LABELS[event.event],
      date: eventDate,
      formatDate: eventFormatDate,
      nextEvent: {
        type: nextEvent,
        date: nextEventDate,
        label: EVENTS_LABELS[nextEvent],
        formatDate: nextEventFormatDate,
      },
    };
    return formatedEvent;
  };

  const EVENTS_LABELS = {
    parto: "Parto",
    celo: "Celo",
    monta: "Monta",
    insem: "Inseminación",
    gesta: "Gestación",
    gestaFail: "G.Fallida",
    gestaSuccess: "G.Exitosa",
    secado: "Secado",
  };

  const ALL_EVENTS = [
    { type: "parto", label: "Parto" },
    { type: "celo", label: "Celo" },
    { type: "monta", label: "Monta" },
    { type: "insem", label: "Insem" },
    { type: "gesta", label: "Gestación" },
    { type: "gestaFail", label: "G.Fallida" },
    { type: "gestaSuccess", label: "G.Exitosa" },
    { type: "secado", label: "Secado" },
  ];

  /*   const ALL_EVENTS = 
  [
    { type: "parto", label: "Parto" },
    { type: "celo", label: "Celo" },
    { type: "monta", label: "Monta" },
    { type: "insem", label: "Inseminacion" },
    { type: "gestaFail", label: "Gesta fallida" },
    { type: "gestaSuccess", label: "Gesta exitosa" },
    { type: "secado", label: "Secado" },
  ]; */

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

  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <NewEventForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        eventsLabels={ALL_EVENTS}
        form={form}
        earrings={earringsData}
      />
      <UpcomingEvents events={formatedEvents} />
      <EventsHistory events={formatedEvents} />
      <EarringTable events={formatedEvents} earrings={earringsData} />
    </>
  );
}

Dashboard.Layout = Layout;
