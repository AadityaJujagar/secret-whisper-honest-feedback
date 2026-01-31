import { useContext } from "react";
import { CommentContext } from "../contexts/comment/CommentContext";

export const useComment = () => {
  const context = useContext(CommentContext);

  if (context === null) {
    throw new Error("useComment must be used within a CommentProvider");
  }

  return context;
};
