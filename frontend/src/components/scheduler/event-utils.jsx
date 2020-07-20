import { EventInput } from "@fullcalendar/react";

let eventGuid = 0;

export const INITIAL_EVENTS: EventInput[] = [{}];

export function createEventId() {
  return String(eventGuid++);
}
