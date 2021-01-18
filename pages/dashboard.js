import Head from "next/head";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../src/components/Layout";
import NewEventForm from "../src/components/NewEventForm";
import UpcomingEvents from "../src/components/UpcomingEvents";
import EventsHistory from "../src/components/EventsHistory";
import EarringTable from "../src/components/EarringTable";
import {
  ALL_EVENTS,
  EARRINGS,
  EVENTS_LABEL,
} from "../src/components/HARD_DATA";
import { formatEvent, getToday } from "../src/utils";
import NewEarring from "../src/components/NewEarring";

moment.locale("es");

export default function Dashboard() {
  //TODO llamar desde la BD evetnos mayores a la fecha del dia de hoy y en orden ascendente
  const eventsAvaiblable = ALL_EVENTS;
  const eventLabels = EVENTS_LABEL;
  const [earringsData, setEarringsData] = useState(EARRINGS);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    date: getToday(),
    earring: "",
    event: "",
  });

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
    setFormatedEvents(events.map((event) => formatEvent(event, eventLabels)));
  }, [events]);

  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <NewEarring />
      <NewEventForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        eventsAvaiblable={eventsAvaiblable}
        earrings={earringsData}
        form={form}
      />
      <UpcomingEvents events={formatedEvents} />
      <EventsHistory events={formatedEvents} />
      <EarringTable events={formatedEvents} earrings={earringsData} />
    </>
  );
}

Dashboard.Layout = Layout;
