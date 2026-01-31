import { useState, useEffect } from "react";
import { CommentContext } from "./CommentContext";
import { apiConnector } from "../../api/apiConnector";
import { commentEndpoints } from "../../api/endpoints";
import { useSocket } from "../../hooks/useSocket";
import toast from "react-hot-toast";

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

  const fetchComments = async (userId) => {
    try {
      setLoading(true);

      // If a specific userId is provided, fetch that profile's comments
      // otherwise fall back to the /me endpoint.
      const url = userId
        ? commentEndpoints.GET_PROFILE_COMMENTS_API(userId)
        : commentEndpoints.GET_MY_PROFILE_COMMENTS_API;

      const res = await apiConnector("GET", url);

      if (res.data.success) {
        setComments(res.data.comments);
      }
    } catch (err) {
      toast.error("Failed to load comments ", err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (payload) => {
    try {
      await apiConnector("POST", commentEndpoints.CREATE_COMMENT_API, payload);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to comment");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await apiConnector(
        "DELETE",
        commentEndpoints.DELETE_COMMENT_API(commentId),
      );
      if (res.data.success) {
        toast.success("Comment deleted");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const toggleVisibility = async (commentId) => {
    try {
      const res = await apiConnector(
        "PATCH",
        commentEndpoints.TOGGLE_VISIBILITY_API(commentId),
      );
      if (res.data.success) {
        toast.success(
          res.data.isVisible ? "Comment shown" : "Comment hidden",
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update visibility");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("comment:new", (comment) => {
      setComments((prev) => [comment, ...prev]);
    });

    socket.on("comment:delete", ({ commentId }) => {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    });

    socket.on("comment:toggle", ({ commentId, isVisible }) => {
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, isVisible } : c)),
      );
    });

    return () => {
      socket.off("comment:new");
      socket.off("comment:delete");
      socket.off("comment:toggle");
    };
  }, [socket]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        addComment,
        deleteComment,
        toggleVisibility,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
