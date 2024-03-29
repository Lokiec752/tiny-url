import { useMutation, useQuery, useQueryClient } from "react-query";
import { Links } from "./Links/Links";
import { UrlForm } from "./UrlForm/UrlForm";

const fetchGoogleUrl = async () => {
  const response = await fetch("/api/google");
  const url = await response.json();
  return url.googleAuthUrl;
};

const postLongUrl = async (url: string) => {
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

const getUserInfo = async () => {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
};

// const getUserSessions = async () => {
//   const response = await fetch("/api/sessions");
//   const sessions = await response.json();
//   return sessions;
// };

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
  const postLongUrlMutation = useMutation(postLongUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
    },
  });
  const shortUrl = postLongUrlMutation.data?.shortUrl;

  const handleLogout = () => deleteUserSessionMutation.mutate();

  const handlePostLongUrl = (url: string) => postLongUrlMutation.mutate(url);

  const isLoading = isGoogleUrlLoading || isUserInfoLoading;
  if (isLoading) return <div>Loading...</div>;

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>
          Please log in <a href={loginUrl}>with google account</a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 justify-center h-full">
      <div className="flex justify-between">
        <h1>Hello {userInfo.name}</h1>
        <button onClick={handleLogout}>Logout</button>
        {/* <button onClick={getUserSessions}>Get user sessions</button> */}
      </div>
      <div className="grid grid-cols-1 grid-rows-2 h-full justify-items-center">
        <Links />
        <UrlForm postUrl={handlePostLongUrl} />
      </div>
      {shortUrl && (
        <div>
          <p>
            Short url:{" "}
            <a href={shortUrl} target="_blank">
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
