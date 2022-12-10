const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
  apiKey: string;
  remainingCredits: number;
}

interface BaseResponse {
  ok: boolean;
  message: string;
}

interface LoginSuccessResponse extends BaseResponse {
  ok: true;
  user: User;
  token: string;
}

interface ErrorResponse extends BaseResponse {
  ok: false;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface GetAllUsersSuccessResponse extends BaseResponse {
  ok: true;
  users: User[];
}

export interface History {
  _id: string;
  content: string;
  createdAt: string;
}

interface GetHistorySuccessResponse extends BaseResponse {
  ok: true;
  history: History[];
}

const login = async ({
  username,
  password,
}: LoginPayload): Promise<LoginSuccessResponse | ErrorResponse> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return response.json();
};

const getUsers = async (): Promise<
  GetAllUsersSuccessResponse | ErrorResponse
> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const getToken = () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }
  return token;
};

const getHistoryByUser = async (
  userId: string | undefined
): Promise<GetHistorySuccessResponse | ErrorResponse> => {
  const response = await fetch(`${API_URL}/history/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};

const deleteUser = async (userId: string): Promise<ErrorResponse> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};

export default {
  login,
  deleteUser,
  getUsers,
  getHistoryByUser,
};
