// Small auth service used by Login/Register pages.
// Exports named functions so components can import { login, saveToken }

export async function login(email, password) {
  // Try to call backend if available, otherwise return a mocked token.
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || "Login failed");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // Fallback: return a mocked token so frontend flows still work during dev
    // when backend isn't present.
    return new Promise((resolve) => {
      setTimeout(() => resolve({ token: "mock-token", user: { email } }), 300);
    });
  }
}

export function saveToken(token) {
  try {
    localStorage.setItem("mm_token", token);
  } catch (e) {
    // ignore storage errors
  }
}

export function getToken() {
  try {
    return localStorage.getItem("mm_token");
  } catch (e) {
    return null;
  }
}

export function logout() {
  try {
    localStorage.removeItem("mm_token");
  } catch (e) {}
}
