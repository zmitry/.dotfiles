import {
  change,
  Rule,
  writeToConfig,
  layer,
  toKey,
  fromKey,
  changeV2,
} from "./utils";

const en_input_source = {
  input_sources: [
    {
      language: "en",
    },
  ],
  type: "input_source_if",
};
const rules: Rule[] = [
  {
    description: "nav layer",
    manipulators: [
      ...changeV2(
        {
          open_bracket: "shift+quote",
          "shift+period": "shift+p",
          "shift+comma": "p",
          p: "quote",
          quote: "delete_or_backspace",
        },
        [en_input_source]
      ),
      ...change(
        [
          {
            type: "combo",
            from: ["w", "e"],
            to: "escape",
            options: {
              key_up_order: "strict_inverse",
            },
          },
        ],
        [en_input_source]
      ),
      ...change([
        {
          type: "double_press",
          from: "right_shift",
          to: toKey("a", "left_command", "left_shift"),
        },
        {
          type: "double_press",
          from: "left_shift",
          to: toKey("spacebar", "left_command"),
        },
      ]),
      {
        type: "basic",
        from: fromKey("left_option"),
        to: [
          {
            key_code: "left_command",
          },
        ],
      },

      ...layer(
        "layer4",
        "right_command",
        undefined,
        [
          ...changeV2(
            {
              d: "hyphen",
              q: "p",
              g: "keypad_plus",
              e: "equal_sign",
              c: "shift+p",
              a: "backslash",
              w: "open_bracket",
              r: "close_bracket",
              f: "shift+close_bracket",
              s: "shift+open_bracket",

              x: "shift+8",
              v: "slash",
              u: "shift+comma",
              o: "shift+period",
              j: "shift+9",
              l: "shift+0",
              i: "shift+hyphen",
              h: "shift+5",
            },
            []
          ),
        ],
        [en_input_source]
      ),

      ...layer(
        "layer3",
        "caps_lock",
        ["left_control", "left_shift", "left_option"].map((el) => ({
          sticky_modifier: {
            [el]: "toggle",
          },
        })),
        [
          {
            type: "basic",
            from: fromKey("period"),
            to: {
              select_input_source: {
                language: "uk",
              },
            },
          },
          {
            type: "basic",
            from: fromKey("comma"),
            to: {
              select_input_source: {
                language: "en",
              },
            },
          },
          ...change([
            { type: "mod", from: "f", mod: "left_command", sticky: true },
            { type: "mod", from: "d", mod: "left_option", sticky: true },
            { type: "mod", from: "s", mod: "left_shift", sticky: true },
            { type: "mod", from: "a", mod: "left_control", sticky: true },
            { type: "key", from: "u", to: "home" },
            { type: "key", from: "o", to: "end" },
            { type: "key", from: "spacebar", to: "return_or_enter" },

            { type: "key", from: "semicolon", to: "delete_or_backspace" },
            { type: "key", from: "h", to: "page_down" },
            { type: "key", from: "y", to: "page_up" },
            { type: "key", from: "n", to: "caps_lock" },
            { type: "key", from: "j", to: "left_arrow" },
            { type: "key", from: "l", to: "right_arrow" },
            { type: "key", from: "k", to: "down_arrow" },
            { type: "key", from: "i", to: "up_arrow" },

            {
              type: "key",
              from: "grave_accent_and_tilde",
              to: "grave_accent_and_tilde",
              mods: ["left_command"],
            },
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
        ],
        []
      ),
      ...layer(
        "sym",
        "right_command",
        undefined,
        [
          ...change([
            { type: "mod", from: "k", mod: "left_option", sticky: true },
            { type: "mod", from: "l", mod: "left_shift", sticky: true },
            { type: "mod", from: "j", mod: "left_command", sticky: true },
            {
              type: "mod",
              from: "semicolon",
              mod: "left_control",
              sticky: true,
            },
            {
              type: "key",
              from: "t",
              to: "non_us_backslash",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "q",
              to: "escape",
            },
            {
              type: "key",
              from: "e",
              to: "open_bracket",
            },
            {
              type: "key",
              from: "r",
              to: "close_bracket",
            },
            {
              type: "key",
              from: "d",
              to: "open_bracket",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "f",
              to: "close_bracket",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "c",
              to: "9",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "v",
              to: "0",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "u",
              to: "comma",
              mods: ["shift"],
            },
            {
              type: "key",
              from: "i",
              to: "period",
              mods: ["shift"],
            },
          ]),
        ],
        []
      ),
    ],
  },
];

writeToConfig(rules).catch(console.error);
