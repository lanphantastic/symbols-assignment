import { Flex } from "smbls";

export const GridSelection = {
  extend: Flex,

  props: {
    padding: "Z B",
    backgroundColor: "grey",
    gap: "5px", // Small gap between grid items
  },
  state: {
    x: 0,
    y: 0,
    total: 0,
    selected: new Set(),
  },
  on: {
    click: (event, element, state) => {
      console.log("element clicked: ", element);
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
      }
    },
  },

  childExtend: {
    tag: "div",
    props: { aspectRatio: "1 / 1", width: "100%" },
  },
  ...Array.from({ length: 8 }, (_, y) => ({
    childExtend: {
      ...Array.from({ length: 16 }, (_, x) => ({
        props: {
          "data-x": x, // Ensure data-x attribute is set
          "data-y": y, // Ensure data-y attribute is set
          style: { backgroundColor: "lightblue", border: "1px solid gray" },
        },
      })),
    },
  })),
  footer: {
    text: (element, state) =>
      `Selected: (${state.x}, ${state.y}), Total: ${state.total}`,
  },
};
