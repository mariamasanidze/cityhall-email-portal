// import api from "./api";

// export async function login(email, password) {
//   const response = await api.post("/api/token/", {
//     email,
//     password,
//   });

//   // Store JWT tokens
//   localStorage.setItem("access", response.data.access);
//   localStorage.setItem("refresh", response.data.refresh);

//   return response.data;
// }

// export async function refreshToken() {
//   const refresh = localStorage.getItem("refresh");
//   const response = await api.post("/api/token/refresh/", { refresh });
//   localStorage.setItem("access", response.data.access);
// }

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

