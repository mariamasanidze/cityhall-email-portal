// Get the API base URL from the environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

// A helper function to handle API requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("access");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    // If the server returns an error, throw an error to be caught by the component
    throw new Error(data.detail || data.error || `Error ${response.status}`);
  }

  return data;
}

// --- API Functions ---

export const getEmails = () => {
  return request("/api/emails/");
};

export const getEmailDetails = (id) => {
  return request(`/api/emails/${id}/`);
};

export const generateReply = (id, choice) => {
  return request(`/api/emails/${id}/generate_reply/`, {
    method: "POST",
    body: JSON.stringify({ choice }),
  });
};

export const sendReply = (id, replyContent) => {
  return request(`/api/emails/${id}/send_reply/`, {
    method: "POST",
    body: JSON.stringify({ reply_content: replyContent }),
  });
};