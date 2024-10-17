import { CharacterType } from "@/constants/characters";

export type CharacterLogViewProps = {
  character: CharacterType;
};
const CharacterLogView = ({ character }: CharacterLogViewProps) => {
  return <div>{`당신은 ${character}입니다.`}</div>;
};

export default CharacterLogView;
