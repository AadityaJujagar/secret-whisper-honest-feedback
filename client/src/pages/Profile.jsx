import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useComment } from "../hooks/useComment";
import { useEffect, useState } from "react";
import { CommentBox } from "../components/comments/CommentBox";
import { CommentList } from "../components/comments/CommentList";
import { useSocket } from "../hooks/useSocket";
import { apiConnector } from "../api/apiConnector";
import { profileEndpoints } from "../api/endpoints";
import toast from "react-hot-toast";

export const Profile = () => {
  const socket = useSocket();
  const { userId } = useParams();
  const { user, setUser } = useAuth();
  const { comments, fetchComments, loading } = useComment();

  const isOwnProfile = !userId || userId === user?._id;

  const [profileUserId, setProfileUserId] = useState(null);
  const [profileOwner, setProfileOwner] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const idToFetch = isOwnProfile ? user._id : userId;
    setProfileUserId(idToFetch);
    fetchComments(idToFetch);
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (isOwnProfile) {
      setProfileOwner(user);
      setNewName(user.name);
      return;
    }

    if (!userId) return;

    const fetchProfileOwner = async () => {
      try {
        setLoadingProfile(true);
        const res = await apiConnector(
          "GET",
          profileEndpoints.GET_USER_PROFILE_API(userId),
        );
        if (res.data.success) {
          setProfileOwner(res.data.user);
        }
      } catch (err) {
        toast.error("Failed to load profile: ", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileOwner();
  }, [userId, isOwnProfile, user]);

  useEffect(() => {
    if (!profileUserId || !socket) return;
    socket.emit("profile:join", profileUserId);
    return () => socket.emit("profile:leave", profileUserId);
  }, [profileUserId, socket]);

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}/profile/${user._id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Profile link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleProfileUpdate = async () => {
    if (!newName && !newImage) {
      toast.error("Nothing to update");
      return;
    }

    const formData = new FormData();
    if (newName) formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      setUpdating(true);

      const res = await apiConnector(
        "PUT",
        profileEndpoints.UPDATE_PROFILE_API,
        formData,
        { "Content-Type": "multipart/form-data" },
      );

      if (res.data.success) {
        setUser(res.data.user);
        setProfileOwner(res.data.user);
        toast.success("Profile updated!");
        setIsEditing(false);
        setNewImage(null);
      }
    } catch (err) {
      toast.error("Profile update failed: ", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileOwner?.image}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          {isEditing ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <h2 className="text-xl font-bold">
              {loadingProfile ? "Loading..." : profileOwner?.name}
            </h2>
          )}

          {isOwnProfile && <p className="text-gray-600">{user.email}</p>}
        </div>
      </div>

      {isOwnProfile && (
        <div className="flex gap-3 mb-6">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit Profile
              </button>

              <button
                onClick={handleShareProfile}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Share Profile
              </button>
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
              />

              <button
                onClick={handleProfileUpdate}
                disabled={updating}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {updating ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      {!isOwnProfile && <CommentBox profileOwnerId={profileUserId} />}

      <CommentList
        comments={comments}
        loading={loading}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
};
