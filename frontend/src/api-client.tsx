import axios, { AxiosError } from "axios";
import { EditFormData, LoginFormData, RegisterFormData } from "./types";
const API_BASE_URI = import.meta.env.VITE_API_URI || "";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const GOOGLE_OAUTH_REDIRECT_URL =
  import.meta.env.VITE_GOOGLE_REDIRECT_URI || "";
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const register = async (formData: RegisterFormData) => {
  try {
    const res = await axios.post(`${API_BASE_URI}/api/users`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage =
        err.response?.data.message ||
        (Array.isArray(err.response?.data) && err.response.data[0]?.message);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
    }
    throw new Error("Something went wrong, please try again.");
  }
};
export const logIn = async (formData: LoginFormData) => {
  try {
    const res = await axios.post(`${API_BASE_URI}/api/auth`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
    throw new Error("Something went wrong, please try again.");
  }
};
export const getGoogleOauthUrl = (redirect_url: string) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: decodeURIComponent(redirect_url),
  };
  const query = new URLSearchParams(options).toString();
  return `${rootUrl}?${query}`;
};
export const validateSession = async () => {
  try {
    const data = await axios.get(`${API_BASE_URI}/api/auth/validate-session`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
    throw new Error("Something went wrong, please try again.");
  }
};

export const logout = async () => {
  try {
    const res = await axios.delete(`${API_BASE_URI}/api/auth`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error("Something went wrong, please try again.");
  }
};

export const editUserData = async ({
  formData,
  userId,
}: {
  formData: EditFormData;
  userId: string;
}) => {
  try {
    const res = await axios.put(
      `${API_BASE_URI}/api/users/${userId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errorMessage =
        err.response?.data.message ||
        (Array.isArray(err.response?.data) && err.response.data[0]?.message);
      if (errorMessage) {
        throw new Error(errorMessage);
      }
    }
    throw new Error("Something went wrong, please try again.");
  }
};
export const deleteAccount = async (userId: string) => {
  try {
    const res = await axios.delete(`${API_BASE_URI}/api/users/${userId}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
    throw new Error("Something went wrong, please try again.");
  }
};
export const fetchCurrentUser = async () => {
  try {
    const res = await axios.get(`${API_BASE_URI}/api/users/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error("Something went wrong, please try again.");
  }
};

export const fetchUserLocation = async () => {
  const res = await fetch(
    `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Error fetching user location.");
  }
  const data = await res.json();
  return data;
};
