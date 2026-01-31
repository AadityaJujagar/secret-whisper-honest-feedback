import { useAuth } from "../../hooks/useAuth";
import { useComment } from "../../hooks/useComment";

export const CommentItem = ({ comment, isOwnProfile }) => {
  const { user } = useAuth();
  const { deleteComment, toggleVisibility } = useComment();

  const isCommentAuthor = comment.commentAuthor?._id === user._id;

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
      {comment.isVisible ? (
        <p className="text-lg leading-relaxed font-medium">“{comment.text}”</p>
      ) : (
        <p className="italic text-muted-foreground">Hidden comment</p>
      )}

      <div className="flex gap-4 mt-4 text-sm">
        {isOwnProfile && (
          <button
            onClick={() => toggleVisibility(comment._id)}
            className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
          >
            {comment.isVisible ? "Hide" : "Show"}
          </button>
        )}

        {isCommentAuthor && (
          <button
            onClick={() => deleteComment(comment._id)}
            className="px-3 py-1 rounded-full bg-red-500/10 text-red-700 hover:bg-red-500/20"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
