import moment from "moment";

export function formatEvent(event) {
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
}
