import { useState } from "react";
import { useComment } from "../../hooks/useComment";

export const CommentBox = ({ profileOwnerId }) => {
  const { addComment } = useComment();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment({
      text,
      profileOwnerId,
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Whisper your comment..."
        maxLength={500}
        className="w-full p-2 border rounded mb-2"
      />

      <button type="submit">Whisper Secretly</button>
    </form>
  );
};
