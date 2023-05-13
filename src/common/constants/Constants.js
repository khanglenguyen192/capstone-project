import COLORS from "./Colors";

const ticketStatusModels = [
  {
    value: 0,
    label: "Open",
  },
  {
    value: 1,
    label: "In Progress",
  },
  {
    value: 2,
    label: "In Review",
  },
  {
    value: 3,
    label: "Done",
  },
  {
    value: 4,
    label: "Pending",
  },
];

export default {
  ticketStatusModels,
};

const typeDayOff = [
  {
    type: 'DAY-OFF',
    option: 1,
    bgColor: COLORS.blue_purple,
  },
  {
    type: 'AM-OFF',
    option: 2,
    bgColor: COLORS.quite_blue,
  },
  {
    type: 'PM-OFF',
    option: 3,
    bgColor: COLORS.quite_orange,
  },
];

const specialDayType = [
  {
    type: "None",
    value: 0,
  },
  {
    type: "DayOff",
    value: 1,
  },
  {
    type: "Holiday",
    value: 2,
  },
  {
    type: "MakeUp",
    value: 3,
  },
  {
    type: "Weekend",
    value: 4,
  },
  {
    type: "Remote",
    value: 5,
  },
];

export {
  typeDayOff,
  specialDayType
};