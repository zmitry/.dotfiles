import { readFile, writeFile } from "fs/promises";

export type Key =
  | "right_command"
  | "right_control"
  | "right_option"
  | "right_shift"
  | "right_alt"
  | "left_command"
  | "left_control"
  | "left_option"
  | "left_shift"
  | "left_alt"
  | "vk_none"
  | "left_gui"
  | "caps_lock"
  | "return_or_enter"
  | "spacebar"
  | "left_arrow"
  | "right_arrow"
  | "up_arrow"
  | "down_arrow"
  | "grave_accent_and_tilde"
  | "non_us_pound"
  | "delete_or_backspace"
  | "delete_forward"
  | "non_us_backslash"
  | "application"
  | "semicolon"
  | "quote"
  | "escape"
  | "open_bracket"
  | "close_bracket"
  | "slash"
  | "backslash"
  | "period"
  | "comma"
  | "equal_sign"
  | "hyphen"
  | "insert"
  | "pause"
  | "home"
  | "end"
  | "page_up"
  | "page_down"
  | "scroll_lock"
  | "print_screen"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "q"
  | "w"
  | "e"
  | "r"
  | "t"
  | "y"
  | "u"
  | "i"
  | "o"
  | "p"
  | "a"
  | "s"
  | "d"
  | "f"
  | "g"
  | "h"
  | "j"
  | "k"
  | "l"
  | "z"
  | "x"
  | "c"
  | "v"
  | "b"
  | "n"
  | "m"
  | "fn"
  | "display_brightness_decrement"
  | "display_brightness_increment"
  | "mission_control"
  | "launchpad"
  | "illumination_decrement"
  | "illumination_increment"
  | "rewind"
  | "play_or_pause"
  | "fastforward"
  | "mute"
  | "volume_decrement"
  | "volume_increment"
  | "tab"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "f10"
  | "f11"
  | "f12"
  | "keypad_1"
  | "keypad_2"
  | "keypad_3"
  | "keypad_0"
  | "keypad_4"
  | "keypad_5"
  | "keypad_6"
  | "keypad_7"
  | "keypad_8"
  | "keypad_slash"
  | "keypad_asterisk"
  | "keypad_9"
  | "keypad_period"
  | "keypad_hyphen"
  | "keypad_plus";

export type Mods =
  | "command"
  | "control"
  | "option"
  | "shift"
  | "left_command"
  | "left_control"
  | "left_option"
  | "left_shift"
  | "fn"
  | "right_command"
  | "right_control"
  | "right_option"
  | "right_shift";

export type ShortMods = "command" | "control" | "option" | "shift";

export type FromEvent = {
  key_code: Key;
  any: "key_code or consumer_key_code or pointing_button";

  modifiers: {
    mandatory: Key[];
    optional: Key[];
  };

  simultaneous: any[];
  simultaneous_options: {
    detect_key_down_uninterruptedly: false;
    key_down_order: "A restriction of input events order";
    key_up_order: "A restriction of input events order";
    key_up_when: "When key_up events are posted";
    to_after_key_up: any[];
  };
};

export function toKey(key: Key, ...mods: (Mods | undefined)[]) {
  return {
    key_code: key,
    modifiers:
      mods?.length > 0
        ? mods
        : {
            optional: ["any"],
          },
  };
}

export function fromKey(key: Key, ...mods: (Mods | undefined)[]) {
  return {
    key_code: key,
    modifiers:
      mods.length > 0
        ? mods
        : {
            optional: ["any"],
          },
  };
}
export type ToEvent = {
  key_code?: Key;

  shell_command?: string;

  select_input_source?: {
    language: string;
    input_source_id: string;
    input_mode_id: string;
  };

  set_variable?: {
    name: string;
    value: any;
  };

  mouse_key?: any;

  sticky_modifier?: any;

  modifiers?: Key[] | any;

  lazy?: boolean;
  repeat?: boolean;
  halt?: boolean;
  hold_down_milliseconds?: 0;
};

export interface Modification {
  type?: string;
  from?: any;
  to?: any[];
  to_if_alone?: any[];
  to_if_held_down?: any[];
  to_after_key_up?: any[];
  to_delayed_action?: {
    to_if_invoked: any[];
    to_if_canceled: any[];
  };
  conditions?: any[];
  parameters?: Record<string, any>;
  description?: string;
}

export type Rule = {
  description: string;
  manipulators: Modification[];
};

const home = "/Users/zmitry";
export async function writeToConfig(rules: any) {
  const content = await readFile(`${home}/.config/karabiner/karabiner.json`);
  const res = JSON.parse(content.toString("utf-8"));
  res.profiles[0].complex_modifications.rules = rules;
  console.log(JSON.stringify(res, null, 2));
  await writeFile(
    `${home}/.config/karabiner/karabiner.json`,
    JSON.stringify(res, null, 2)
  );
}
export function layer(
  name: string,
  key: Key,
  alone_key: ToEvent[] | undefined,
  modifications: Modification[],
  conditions?: any
) {
  return [
    {
      conditions: [
        {
          name: "symbols",
          type: "variable_unless",
          value: 1,
        },
        {
          name: "mouse",
          type: "variable_unless",
          value: 1,
        },
        {
          name: "shifted",
          type: "variable_unless",
          value: 1,
        },
        {
          name: "system",
          type: "variable_unless",
          value: 1,
        },
        ...conditions,
      ],
      from: {
        key_code: key,
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          set_variable: {
            name: name,
            value: 1,
          },
        },
      ],
      to_after_key_up: [
        {
          set_variable: {
            name: name,
            value: 0,
          },
        },
      ],
      to_if_alone: alone_key ? alone_key : undefined,
      type: "basic",
      parameters: {
        "basic.to_if_alone_timeout_milliseconds": 150,
      },
    },
    ...modifications.map((el) => ({
      ...el,
      conditions: [
        ...(el.conditions ? el.conditions : []),
        {
          name: name,
          type: "variable_if",
          value: 1,
        },
      ],
      type: "basic",
    })),
  ];
}

export function layerTouchpad(
  name: string,
  numberOfTouches: number,
  modifications: Modification[]
) {
  return [
    ...modifications.map((el) => ({
      conditions: [
        {
          type: "variable_if",
          name: "multitouch_extension_finger_count_total",
          value: numberOfTouches,
        },
      ],
      ...el,
      type: "basic",
    })),
  ];
}

export function doublePress(name: string, key: Key, to: ToEvent) {
  return [
    {
      type: "basic",
      from: {
        key_code: key,
        modifiers: {
          optional: ["any"],
        },
      },
      to: [to],
      conditions: [
        {
          type: "variable_if",
          name: name,
          value: 1,
        },
      ],
    },
    {
      type: "basic",
      from: {
        key_code: key,
        modifiers: {
          optional: ["any"],
        },
      },
      to: [
        {
          set_variable: {
            name: name,
            value: 1,
          },
        },
        {
          key_code: key,
        },
      ],
      to_delayed_action: {
        to_if_invoked: [
          {
            set_variable: {
              name: name,
              value: 0,
            },
          },
        ],
        to_if_canceled: [
          {
            set_variable: {
              name: name,
              value: 0,
            },
          },
        ],
      },
    },
  ];
}

export type KeysChangeArgs =
  | {
      type: "key";
      from: Key;
      to: Key;
      mods?: Mods[];
    }
  | {
      type: "mod";
      from: Key;
      mod: Mods;
      sticky?: boolean;
    }
  | {
      type: "double_press";
      from: Key;
      to: ToEvent;
    }
  | {
      type: "combo";
      from: Array<Key>;
      to: Key;
      options?: {
        detect_key_down_uninterruptedly?: boolean;
        key_down_order?: "insensitive" | "strict" | "strict_inverse";
        key_up_order?: "insensitive" | "strict" | "strict_inverse";
        key_up_when?: "any" | "all";
        to_after_key_up?: string;
      };
    };

export function change(mods: KeysChangeArgs[], conditions: any = undefined) {
  return [
    ...mods.map((el) => {
      if (el.type === "double_press") {
        return doublePress(el.type + "_" + el.from, el.from, el.to) as any;
      }
      if (el.type == "combo") {
        return {
          from: {
            simultaneous: el.from.map((el) => ({
              key_code: el,
            })),
            simultaneous_options: el.options,
            modifiers: {
              optional: ["any"],
            },
          },
          to: [
            {
              key_code: el.to,
            },
          ].filter(Boolean),
          conditions,
          type: "basic",
        };
      }
      if (el.type == "mod") {
        return {
          from: {
            key_code: el.from,
            modifiers: {
              optional: ["any"],
            },
          },
          to: [
            el.sticky
              ? {
                  conditions,
                  sticky_modifier: {
                    [el.mod]: "toggle",
                  },
                }
              : null,
            {
              conditions,
              key_code: el.mod,
            },
          ].filter(Boolean),
          type: "basic",
        };
      } else if (el.type === "key") {
        return {
          from: {
            key_code: el.from,
            modifiers: {
              optional: ["any"],
            },
          },
          to: [
            {
              conditions,
              key_code: el.to,
              modifiers: el.mods,
            },
          ],
          type: "basic",
        };
      }
      return "" as never;
    }),
  ].flat(1);
}

type shiftedKeys = `${`shift+` | ""}${Key}`;
export type KeysChangeArgsV2 =
  | {
      type?: "key";
      to: Key;
      mods?: Mods[];
    }
  | {
      type: "mod";
      mod: Mods;
      sticky?: boolean;
    }
  | {
      type: "double_press";
      to: ToEvent;
    }
  | `${`${ShortMods}+` | ""}${Key}`;

type ModsMap = {
  [key in shiftedKeys]?: KeysChangeArgsV2;
};

function parseKey(key: string) {
  const mods = key.split("+");
  return {
    mods: mods.slice(0, -1).filter(Boolean) as Mods[],
    key: mods.slice(-1)[0] as Key,
  };
}

export function changeV2(mods: ModsMap, conditions: any = undefined) {
  return Object.entries(mods).map(([from, el]) => {
    if (typeof el === "string" || !el.type || el.type === "key") {
      if (typeof el === "string") {
        const to = parseKey(el);
        const fromParsed = parseKey(from);
        return {
          conditions,
          from: {
            key_code: fromParsed.key as Key,
            modifiers: fromParsed.mods.length
              ? { mandatory: fromParsed.mods }
              : {
                  optional: ["any"],
                },
          },
          to: [
            {
              key_code: to.key,
              modifiers: to.mods,
            },
          ],
          type: "basic",
        };
      }
      return {
        conditions,
        from: {
          key_code: from as Key,
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: el.to,
            modifiers: el.mods,
          },
        ],
        type: "basic",
      };
    }
    if (el.type === "double_press") {
      return doublePress(
        el.type + "_" + (from as any),
        from as any,
        el.to
      ) as any;
    }

    if (el.type == "mod") {
      return {
        conditions,
        from: {
          key_code: from as Key,
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          el.sticky
            ? {
                sticky_modifier: {
                  [el.mod]: "toggle",
                },
              }
            : null,
          {
            key_code: el.mod,
          },
        ].filter(Boolean),
        type: "basic",
      };
    }
    return "" as never;
  });
}
