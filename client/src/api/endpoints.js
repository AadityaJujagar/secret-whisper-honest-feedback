const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authEndpoints = {
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  LOGOUT_API: `${BASE_URL}/auth/logout`,
};

export const commentEndpoints = {
  CREATE_COMMENT_API: `${BASE_URL}/comments/comment`,
  DELETE_COMMENT_API: (commentId) =>
    `${BASE_URL}/comments/delete-comment/${commentId}`,
  TOGGLE_VISIBILITY_API: (commentId) =>
    `${BASE_URL}/comments/toggle-comment/${commentId}`,
  GET_MY_PROFILE_COMMENTS_API: `${BASE_URL}/comments/me`,
  GET_PROFILE_COMMENTS_API: (userId) =>
    `${BASE_URL}/comments/profile/${userId}`,
};

export const profileEndpoints = {
  MY_PROFILE_API: `${BASE_URL}/profiles/me`,
  UPDATE_PROFILE_API: `${BASE_URL}/profiles/update-profile`,
  GET_USER_PROFILE_API: (userId) => `${BASE_URL}/profiles/user/${userId}`,
};
