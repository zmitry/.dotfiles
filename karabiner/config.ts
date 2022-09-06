import {
  change,
  Rule,
  writeToConfig,
  layer,
  key,
  layerTouchpad,
} from "./utils";

const exitSticky = {
  type: "basic",
  from: {
    key_code: "escape",
  },
  to: [
    ...["left_command", "left_option", "left_control", "left_shift"].map(
      (el) => ({
        sticky_modifier: {
          [el]: "off",
        },
      })
    ),
  ],
};
const rules: Rule[] = [
  {
    description: "nav layer",
    manipulators: [
      ...change([
        {
          type: "double_press",
          from: "right_shift",
          to: key("a", "left_command", "left_shift"),
        },
        {
          type: "double_press",
          from: "left_shift",
          to: key("spacebar", "left_command"),
        },
        {
          type: "key",
          from: "right_command",
          to: "right_control",
        },
      ]),
      ...layer("nav", "caps_lock", "escape", [
        ...change([
          { type: "mod", from: "f", mod: "left_command", sticky: true },
          { type: "mod", from: "d", mod: "left_option", sticky: true },
          { type: "mod", from: "s", mod: "left_shift", sticky: true },
          { type: "mod", from: "a", mod: "left_control", sticky: true },
          { type: "key", from: "u", to: "home" },
          { type: "key", from: "o", to: "end" },

          { type: "key", from: "semicolon", to: "return_or_enter" },
          { type: "key", from: "slash", to: "delete_or_backspace" },

          { type: "key", from: "j", to: "left_arrow" },
          { type: "key", from: "l", to: "right_arrow" },
          { type: "key", from: "k", to: "down_arrow" },
          { type: "key", from: "i", to: "up_arrow" },

          {
            type: "key",
            from: "z",
            to: "z",
            mods: ["left_command"],
          },
          {
            type: "key",
            from: "x",
            to: "x",
            mods: ["left_command"],
          },
          {
            type: "key",
            from: "c",
            to: "c",
            mods: ["left_command"],
          },
          {
            type: "key",
            from: "v",
            to: "v",
            mods: ["left_command"],
          },
        ]),
      ]),
    ],
  },
];

writeToConfig(rules).catch(console.error);
