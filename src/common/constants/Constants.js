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
    type: 'AM-OFF',
    bgColor: COLORS.quite_blue,
  },
  {
    type: 'PM-OFF',
    bgColor: COLORS.quite_orange,
  },
  {
    type: 'DAY-OFF',
    bgColor: COLORS.blue_purple,
  },
];

export {
  typeDayOff
};