import { useAuth } from "../../hooks/useAuth";
import { useComment } from "../../hooks/useComment";

export const CommentItem = ({ comment, isOwnProfile }) => {
  const { user } = useAuth();
  const { deleteComment, toggleVisibility } = useComment();

  const isCommentAuthor = comment.commentAuthor?._id === user._id;

  return (
    <div className="border p-3 rounded">
      {comment.isVisible ? (
        <p>{comment.text}</p>
      ) : (
        <p className="italic text-gray-500">Hidden comment</p>
      )}

      <div className="flex gap-4 mt-2 text-sm">
        {isOwnProfile && (
          <button
            onClick={() => toggleVisibility(comment._id)}
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {comment.isVisible ? "Hide" : "Show"}
          </button>
        )}

        {isCommentAuthor && (
          <button
            onClick={() => deleteComment(comment._id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
