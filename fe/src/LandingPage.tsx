import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchGoogleUrl = async () => {
  const response = await fetch("/api/google");
  const url = await response.json();
  return url.googleAuthUrl;
};

const getUserInfo = async () => {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
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
  const queryClient = useQueryClient();
  const { data: loginUrl, isLoading: isGoogleUrlLoading } = useQuery({
    queryKey: ["google"],
    queryFn: fetchGoogleUrl,
  });
  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    retry: false,
  });
  const deleteUserSessionMutation = useMutation(deleteUserSession, {
    onSuccess: () => {
      queryClient.invalidateQueries("userInfo");
    },
  });

  const handleLogout = () => deleteUserSessionMutation.mutate();

  const isLoading = isGoogleUrlLoading || isUserInfoLoading;
  if (isLoading) return <div>Loading...</div>;

  if (!userInfo) {
    return (
      <p>
        Please log in <a href={loginUrl}>with google account</a>
      </p>
    );
  }
  return (
    <>
      <p>Hello {userInfo.name}</p>
      <button onClick={getUserSessions}>Get user sessions</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default LandingPage;
