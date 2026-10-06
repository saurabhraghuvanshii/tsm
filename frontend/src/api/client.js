const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export async function request(path, { method = "GET", body, signal } = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError(0, "Cannot reach the server");
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.message || `Request failed (${response.status})`;
    throw new ApiError(response.status, message, payload?.error?.details);
  }

  return payload;
}

export const isAbortError = (error) => error?.name === "AbortError";
