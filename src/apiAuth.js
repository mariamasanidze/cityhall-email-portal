
import api from "./api";

export async function login(email, password) {
  const res = await api.post("/token/", { email, password });

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  localStorage.setItem("department", JSON.stringify(res.data.department));

  return res.data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  const res = await api.post("/token/refresh/", { refresh });
  localStorage.setItem("access", res.data.access);
}

