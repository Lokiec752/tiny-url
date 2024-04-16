import { useMutation, useQuery, useQueryClient } from "react-query";
import { Links } from "./Links/Links";
import { UrlForm } from "./UrlForm/UrlForm";
import {
  deleteUserSession,
  fetchGoogleUrl,
  getUserInfo,
  postLongUrl,
} from "./api";

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
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div>Loading...</div>
      </div>
    );

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
      </div>
      <div className="grid grid-cols-1 grid-rows-3 h-full justify-items-center">
        <Links />
        <UrlForm postUrl={handlePostLongUrl} />
        {shortUrl && (
          <div className="flex justify-center">
            <p>
              Short url:{" "}
              <a href={shortUrl} target="_blank">
                {shortUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
