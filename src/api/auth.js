import instance from ".";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const login = async (userInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (let key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/auth/register", formData);
  storeToken(data.token);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};
const logout = () => {
  localStorage.removeItem("token");
};

export { login, register, me, getAllUsers, checkToken, logout };
