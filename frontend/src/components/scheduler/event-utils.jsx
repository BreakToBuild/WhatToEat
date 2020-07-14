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
];

export function createEventId() {
  return String(eventGuid++);
}
