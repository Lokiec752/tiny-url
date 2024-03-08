import { useQuery } from "react-query";

const fetchGoogleUrl = async () => {
  const response = await fetch("/api/google");
  const url = await response.json();
  return url.googleAuthUrl;
};

const getUserSessions = async () => {
  const response = await fetch("/api/sessions");
  const sessions = await response.json();
  return sessions;
};

const deleteUserSession = async () => {
  const response = await fetch("/api/sessions", {
    method: "DELETE",
  });
  const session = await response.json();
  return session;
};

function LandingPage() {
  const { data: loginUrl, isLoading } = useQuery({
    queryKey: ["google"],
    queryFn: fetchGoogleUrl,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      Please log in <a href={loginUrl}>with google account</a>
      <button onClick={getUserSessions}>Get user sessions</button>
      <button onClick={deleteUserSession}>Logout</button>
    </>
  );
}

export default LandingPage;
