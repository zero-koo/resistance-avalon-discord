export type CharacterType = DefaultCharacterType | SpecialCharacterType;

export const defaultCharacterTypes = ["Citizen", "Evil"] as const;

export const optionalCitizenTypes = ["Percival"] as const;

export const optionalDevilTypes = ["Morgana", "Oberon", "Mordred"] as const;

export const optionalCharacterTypes = [
  ...optionalCitizenTypes,
  ...optionalDevilTypes,
];

export const specialCharacterTypes = [
  "Merlin",
  "Assassin",
  ...optionalCharacterTypes,
] as const;

export type DefaultCharacterType = (typeof defaultCharacterTypes)[number];

export type OptionalCitizenType = (typeof optionalCitizenTypes)[number];

export type OptionalDevilType = (typeof optionalDevilTypes)[number];

export type OptionalCharacterType = (typeof optionalCharacterTypes)[number];

export type SpecialCharacterType = (typeof specialCharacterTypes)[number];

export const characterSide = ["Citizen", "Evil", "Neutral"] as const;

export type CharacterSide = (typeof characterSide)[number];

export type Character = {
  name: CharacterType;
  side: CharacterSide;
  knownCharacters: KnownCharacter[];
};

type KnownCharacter = {
  targetCharacter: CharacterType;
  side?: CharacterSide;
  name?: CharacterType;
};

export const characterMap: Record<CharacterType, Character> = {
  Citizen: {
    name: "Citizen",
    side: "Citizen",
    knownCharacters: [],
  },
  Merlin: {
    name: "Merlin",
    side: "Citizen",
    knownCharacters: [
      {
        targetCharacter: "Assassin",
        side: "Evil",
      },
      {
        targetCharacter: "Morgana",
        side: "Evil",
      },
      {
        targetCharacter: "Oberon",
        side: "Evil",
      },
      {
        targetCharacter: "Evil",
        side: "Evil",
      },
    ],
  },
  Percival: {
    name: "Percival",
    side: "Citizen",
    knownCharacters: [
      {
        targetCharacter: "Merlin",
        name: "Merlin",
      },
      {
        targetCharacter: "Morgana",
        name: "Merlin",
      },
    ],
  },
  Evil: {
    name: "Evil",
    side: "Evil",
    knownCharacters: [
      {
        targetCharacter: "Evil",
        side: "Evil",
      },
      {
        targetCharacter: "Assassin",
        side: "Evil",
      },
      {
        targetCharacter: "Morgana",
        side: "Evil",
      },
      {
        targetCharacter: "Mordred",
        side: "Evil",
      },
    ],
  },
  Assassin: {
    name: "Assassin",
    side: "Evil",
    knownCharacters: [
      {
        targetCharacter: "Evil",
        side: "Evil",
      },
      {
        targetCharacter: "Morgana",
        side: "Evil",
      },
      {
        targetCharacter: "Mordred",
        side: "Evil",
      },
    ],
  },
  Morgana: {
    name: "Morgana",
    side: "Evil",
    knownCharacters: [
      {
        targetCharacter: "Assassin",
        side: "Evil",
      },
      {
        targetCharacter: "Evil",
        side: "Evil",
      },
      {
        targetCharacter: "Mordred",
        side: "Evil",
      },
    ],
  },
  Mordred: {
    name: "Mordred",
    side: "Evil",
    knownCharacters: [
      {
        targetCharacter: "Assassin",
        side: "Evil",
      },
      {
        targetCharacter: "Evil",
        side: "Evil",
      },
      {
        targetCharacter: "Morgana",
        side: "Evil",
      },
    ],
  },
  Oberon: {
    name: "Oberon",
    side: "Evil",
    knownCharacters: [],
  },
};
