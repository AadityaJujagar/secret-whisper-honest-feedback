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
    <form
      onSubmit={handleSubmit}
      className="border border-primary/20 rounded-2xl shadow-lg shadow-primary/5 overflow-hidden mb-6"
    >
      <div className="bg-primary/5 p-4 border-b border-primary/10">
        <h3 className="font-semibold text-primary">Send Anonymous Feedback</h3>
      </div>

      <div className="p-6 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind? Be honest..."
          maxLength={500}
          className="w-full min-h-[120px] resize-none rounded-lg border border-border px-4 py-3 text-lg focus:outline-none focus:border-primary/50"
        />

        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Max 500 characters
          </span>

          <button
            type="submit"
            className="px-8 py-2 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition"
          >
            Whisper Secretly
          </button>
        </div>
      </div>
    </form>
  );
};
