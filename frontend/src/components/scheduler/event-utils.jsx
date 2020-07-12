import { EventInput } from "@fullcalendar/react";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "today",
    start: todayStr,
    color: "black",
    editable: true,
  },
  {
    id: createEventId(),
    title: "Sardinhas na cataplana",
    date: "2020-07-07",
    allDay: "true",
  },
  {
    id: createEventId(),
    title: "sim",
    date: "2020-07-01",
    allDay: "true",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
