export const fetchGoogleUrl = async () => {
  const response = await fetch("/api/google");
  const url = await response.json();
  return url.googleAuthUrl;
};

export const postLongUrl = async (url: string) => {
  const response = await fetch("/api/shortener", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  const shortUrl = await response.json();
  return shortUrl;
};

export const deleteUrl = async (id: string) => {
  const response = await fetch(`/api/links/${id}`, {
    method: "DELETE",
  });
  const deletedUrl = await response.json();
  return deletedUrl;
}

export const getUserInfo = async () => {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
};

export const deleteUserSession = async () => {
  const response = await fetch("/api/sessions", {
    method: "DELETE",
  });
  const session = await response.json();
  return session;
};