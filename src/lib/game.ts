import { CharacterType, OptionalCharacterType } from "@/constants/characters";
import { numDevilsPerPlayers } from "@/constants/settings";

export function characterListFromSetting({
  numPlayers,
  optionalCitizens,
  optionalDevils,
}: {
  numPlayers: number;
  optionalCitizens: OptionalCharacterType[];
  optionalDevils: OptionalCharacterType[];
}): CharacterType[] {
  const numDevils = numDevilsPerPlayers[numPlayers];
  const numCitizens = numPlayers - numDevils;

  // the number '1' indicates default special characters, "Merlin" and "Assassin" on each side
  const citizens: CharacterType[] = [
    "Merlin",
    ...optionalCitizens.slice(0, numCitizens - 1),
    ...Array(numCitizens)
      .fill("Citizen")
      .splice(optionalCitizens.length + 1),
  ];

  // in case the number of optional devils is larger than acceptable
  const devils: CharacterType[] = [
    "Assassin",
    ...optionalDevils.slice(0, numDevils - 1),
    ...Array(numDevils)
      .fill("Evil")
      .splice(optionalDevils.length + 1),
  ];

  return [...citizens, ...devils];
}

export function shuffle<T>(items: T[]): T[] {
  return items
    .map((item) => ({ item, value: Math.random() }))
    .sort(({ value: prev }, { value: curr }) => (prev < curr ? -1 : 1))
    .map(({ item }) => item);
}
