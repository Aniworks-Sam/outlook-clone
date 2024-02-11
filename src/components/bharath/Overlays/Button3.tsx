import React, { ReactNode, useContext } from "react";
import Classes from "../SentMail/SendButton.module.css";
import AuthContext from "../Store/Auth-context";
import RateReviewIcon from '@mui/icons-material/RateReview';
interface ChildProps {
  name: string;
  onClick: () => void;
}

export default function Button(props: ChildProps) {
  const AuthCtx = useContext(AuthContext);
  return (
    <div>
      <div>
        <button
          onClick={props.onClick}
          className={`${Classes.send_button1} ${Classes.sideButton}`}
        >
          {<RateReviewIcon fontSize="medium"></RateReviewIcon>}
          {props.name}
        </button>
      </div>
    </div>
  );
}
