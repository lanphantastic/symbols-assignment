// pages.js
"use strict";

import { GridSelection } from "./gridSelection";

export default {
  "/": {
    H1: { text: "Hello Symbols" },
    P: { text: "Lorem ipsum dolor sit amet" },
  },
  "/about": {
    H3: { text: "This is Symbols starter-kit" },
    P: { text: "Lorem ipsum dolor sit amet" },
  },
  "/grid-selection": {
    H3: { text: "Grid Selection" },
    GridSelection: GridSelection,
    Link: {
      href: "/",
      text: "Go Back",
    },
  },
};
