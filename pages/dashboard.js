import Head from "next/head";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../src/components/Layout";
import NewEventForm from "../src/components/NewEventForm";
import UpcomingEvents from "../src/components/UpcomingEvents";
import EventsHistory from "../src/components/EventsHistory";
import EarringTable from "../src/components/EarringTable";
import { EARRINGS, EVENTS } from "../src/components/HARD_DATA";

const EARRING_DATA = EARRINGS;
const EVENTS_HISTORY = EVENTS;

moment.locale("es");

export default function Dashboard() {
  //TODO llamar desde la BD evetnos mayores a la fecha del dia de hoy y en orden ascendente
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsHistory, setEventsHistory] = useState([]);
  const [earringsData, setEarringsData] = useState(EARRING_DATA || []);

  const [form, setForm] = useState({
    date: getToday(),
    earring: "",
    name: "",
  });

  useEffect(() => {
    const formatedEvents = EVENTS.map((event) => formatEvent(event));
    setEventsHistory(formatedEvents);
    setUpcomingEvents(formatedEvents);
  }, []);

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
    const eventFormatDate = moment(form.date)
      .add(12, "hours")
      .format("DD MMMM")
      .slice(0, 6);
    const eventDate = new Date(form.date);
    let nextCheck;
    let nextEvent;
    switch (form.name) {
      case "parto":
        nextEvent = "Secado";
        nextCheck = moment(form.date).add(12, "hours").add(7, "months");
        break;
      case "celo":
        nextEvent = "Celo";
        nextCheck = moment(form.date).add(12, "hours").add(21, "d");
        break;
      case "servicio":
        nextEvent = "Preña";
        nextCheck = moment(form.date).add(12, "hours").add(21, "d");
        break;
      default:
        break;
    }

    const newEvent = {
      ...form,
      date: eventDate,
      formatDate: eventFormatDate,
      nextEvent: {
        date: new Date(nextCheck),
        label: nextEvent,
        formatDate: nextCheck?.format("DD MMMM").slice(0, 6),
      },
    };
    console.log(form);

    setUpcomingEvents([...upcomingEvents, newEvent]);
    setEventsHistory([...eventsHistory, newEvent]);
  };

  function getToday() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    return today;
  }

  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewEventForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        earrings={earringsData}
      />
      <UpcomingEvents events={upcomingEvents} />
      <EventsHistory events={eventsHistory} />

      <EarringTable events={eventsHistory} earrings={earringsData} /> 
      {/*
      */}
    </>
  );
}

Dashboard.Layout = Layout;
