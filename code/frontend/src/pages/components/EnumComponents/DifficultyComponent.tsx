import { Difficulty } from "../../../enums";
import EnumSelectComponent from "./EnumSelectComponent";

const difficultyOptions = [
  { label: "Easy", value: Difficulty.EASY },
  { label: "Medium", value: Difficulty.MEDIUM },
  { label: "Hard", value: Difficulty.HARD },
];

type DifficultyComponentProps = {
  selectedDifficulty: Difficulty;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DifficultyComponent = ({
  selectedDifficulty,
  onChange,
}: {
  selectedDifficulty: Difficulty;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <EnumSelectComponent
      label="Difficulty"
      value={selectedDifficulty}
      onChange={onChange}
      options={difficultyOptions}
    />
  );
};