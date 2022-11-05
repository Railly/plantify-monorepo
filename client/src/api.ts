const API_URL = import.meta.env.VITE_API_URL;

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  console.log({ API_URL });
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
