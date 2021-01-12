import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout";
import moment from "moment";
import UpcomingEvents from "../components/UpcomingEvents";
import EventsHistory from "../components/EventsHistory";
import NewEventForm from "../components/NewEventForm";
import EarringData from "../components/EarringData";

const EARRING_DATA = [
  {
    number: "01",
    nickName: "Pinta",
    birth: "2020-11-28",
    photo: "",
  },
  {
    number: "023",
    nickName: "Blanca",
    birth: "2018-06-01",
    photo: "",
  },
  {
    number: "11",
    nickName: "",
    birth: "2015-1-20",
    photo: "",
  },
];
moment.locale("es");

export default function Dashboard() {
  const [form, setForm] = useState({
    date: getToday(),
    earring: "",
    name: "",
  });

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
    console.log(newEvent);

    setUpcomingEvents([...upcomingEvents, newEvent]);
    setEventsHistory([...eventsHistory, newEvent]);
  };

  //TODO llamar desde la BD evetnos mayores a la fecha del dia de hoy y en orden ascendente
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsHistory, setEventsHistory] = useState([]);
  const [earringsData, setEarringsData] = useState(EARRING_DATA || []);

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

      <EarringData events={eventsHistory} earrings={earringsData} />
    </>
  );
}

Dashboard.Layout = Layout;
