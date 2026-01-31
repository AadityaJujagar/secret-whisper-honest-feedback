import { CommentItem } from "./CommentItem";

export const CommentList = ({ comments, loading, isOwnProfile }) => {
  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (!comments.length) {
    return <p>No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          isOwnProfile={isOwnProfile}
        />
      ))}
    </div>
  );
};
