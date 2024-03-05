import { useQuery } from "react-query";

const fetchGoogleUrl = async () => {
  const response = await fetch("/api/google");
  const url = await response.json();
  return url.googleAuthUrl;
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
    </>
  );
}

export default LandingPage;
