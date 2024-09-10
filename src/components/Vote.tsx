import { useState } from "react";

type VoteProps = {
  value?: boolean | null;
  onVote: (value: boolean | null) => void;
};

const Vote: React.FC<VoteProps> = ({ value, onVote }) => {
  const [isAgree, setIsAgree] = useState<boolean | null>(value ?? null);
  return (
    <div>
      <div>
        <input type="radio" name="id" onClick={() => setIsAgree(true)} />
        <input type="radio" name="id" onClick={() => setIsAgree(false)} />
      </div>
      <div>
        {value === null ? (
          <button disabled={isAgree === null} onClick={() => onVote(isAgree!)}>
            확인
          </button>
        ) : (
          <button onClick={() => onVote(null)}>취소</button>
        )}
      </div>
    </div>
  );
};

export default Vote;
