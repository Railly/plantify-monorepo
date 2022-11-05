const API_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
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

interface LoginErrorResponse extends BaseResponse {
  ok: false;
}

interface LoginPayload {
  username: string;
  password: string;
}

const login = async ({
  username,
  password,
}: LoginPayload): Promise<LoginSuccessResponse | LoginErrorResponse> => {
  const response = await fetch(`${API_URL}/user/login`, {
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

export default {
  login,
};
