// We don't import anything from api.js anymore for these functions,
// as they are the first point of contact and construct their own requests.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

// A helper function specifically for authentication requests, which don't send a token.
async function authRequest(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || `Error ${response.status}`);
  }

  return data;
}

export async function login(email, password) {
  // Use our new helper to make the request
  const data = await authRequest("/api/token/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Store the tokens and department info received from the backend
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("department", JSON.stringify(data.department));

  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    throw new Error("No refresh token found.");
  }
  
  // Use our helper for the refresh request
  const data = await authRequest("/api/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
  
  // Update the access token in storage
  localStorage.setItem("access", data.access);
  
  return data;
}