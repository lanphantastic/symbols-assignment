"use strict";

import { Button, Flex, Input, Link } from "smbls";
import { parseIntegerFromString } from "./utils/integer";

export const Header = {
  extend: Flex,
  props: {
    minWidth: "100%",
    padding: "Z B",
    align: "center space-between",
  },

  Flex: {
    props: { gap: "C" },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration:
          window.location.pathname === props.href ? "underline" : "none",
      }),
    },
    Text_logo: { href: "/", text: "Hello!" },
    Text_about: { href: "/about", text: "About" },
    Text_grid_selection: { href: "/grid-selection", text: "Grid Selection" },
  },

  ThemeSwitcher: {},
};

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: "A2" },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: "pointer",
      ".active": {
        fontWeight: "900",
      },
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key });
      },
    },
  },
  dark: { text: "Dark" },
  light: { text: "Light" },
  midnight: { text: "Midnight" },
};

export const Footer = {
  props: {
    padding: "Z B",
    order: 9,
  },
};

export const GridXByInput = {
  props: {
    placeholder: "Enter your X value",
    width: "100%",
    border: "none",
    borderRadius: "A",
    padding: "A B",
  },
  state: { GridX: { position: 0 } },
  Input: {
    onInput: (event, element, state) => {
      state.update({
        GridX: { position: parseIntegerFromString(event.data) },
      });
      // ! IMPROVEMENT: allow only numerical value; use regular expression
    },
  },
};
export const GridYByInput = {
  props: {
    placeholder: "Enter your Y value",
    width: "100%",
    border: "none",
    borderRadius: "A",
    padding: "A B",
  },
  state: { GridY: { position: 0 } },
  Input: {
    onInput: (event, element, state) => {
      state.update({
        GridY: { position: parseIntegerFromString(event.data) },
      });
      // ! IMPROVEMENT: allow only numerical value; use regular expression
    },
  },
};

export const CreateXYGridByButton = {
  extend: Button,
  props: {
    text: "Create XY Grid",
    width: "100%",
    padding: "A B",
    backgroundColor: "orange",
    ":hover": {
      backgroundColor: "orange +35",
    },
  },
  on: {
    click: (event, element, state) => {
      // !using the input value from the X and Y input fields, pass the value to the GridSelection component to create a X * Y grid
    },
  },
};

export const GridSelection = {
  extend: Flex,

  props: {
    flow: "y",
    padding: "Z B",
    backgroundColor: "grey",
  },
  state: {
    x: 0,
    y: 0,
    selectedKey: 0,
  },

  Grid: {
    props: {
      columns: "repeat(8, 1fr)",
      gap: "1px",
    },
    childExtend: "GridBox",
    ...new Array(
      8 * 16
      // ! Improvement: use the inputted x and y input fields if it exists
      // state.parent.gridX.position * state.parent.gridY.position
    ).fill({}),
  },
  footer: {
    text: (element, state) =>
      `Selected: (${state.y}, ${state.selectedKey}) Total: ${state.x}`,
  },
};

export const GridBox = {
  tag: "div",
  props: (element, state) => {
    const key = parseIntegerFromString(element.key);
    if (key < state.x) {
      return {
        aspectRatio: "1 / 1",
        backgroundColor: "white",
        ":hover": {
          cursor: "pointer",
          backgroundColor: "red",
        },
      };
    } else {
      return {
        aspectRatio: "1 / 1",
        backgroundColor: "green",
        ":hover": {
          cursor: "pointer",
          backgroundColor: "skyBlue",
        },
      };
    }
  },

  on: {
    click: (event, element, state) => {
      console.log("event clicked: ", event);
      console.log("element clicked: ", element);
      console.log("state clicked: ", state);

      const { x, y } = element.dataset || {}; // Use default empty object if dataset is undefined
      if (x && y) {
        state.x = x;
        state.y = y;

        // Update selected cells
        for (let i = 0; i <= y; i++) {
          for (let j = 0; j <= x; j++) {
            state.update({ selected: state.selected.push(`${i},${j}`) });
          }
        }

        state.update({ selected: state.selected.length });
      } else {
        const key = parseIntegerFromString(element.key);
        const column = key + 1;
        const selectedKey = (key % 8) + 1;
        const row = Math.floor(key / 8) + 1;
        // ! improvement: instead of using the default value of 8 x 16 grid, use the input values

        console.log("Element clicked is a cell: ", row, column);
        state.update({ selectedKey: selectedKey, x: column, y: row });
      }
      console.log("State updated: ", state);
    },
  },
};
