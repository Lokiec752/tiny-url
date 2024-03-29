import { useQuery } from "react-query";

const getUserLinks = async () => {
  const response = await fetch("/api/links");
  const links = await response.json();
  return links;
};

export function Links() {
  const { data: links, isLoading: isLinksLoading } = useQuery({
    queryKey: ["links"],
    queryFn: getUserLinks,
  });

  if (isLinksLoading) {
    return <div>Loading...</div>;
  }

  return (
    links.length && (
      <div className="flex justify-start flex-col mb-4 gap-8">
        <h2 className="text-xl text-center">Your existing links:</h2>
        <ul>
          {links.map(
            (link: { id: string; short_url: string; original_url: string }) => (
              <li key={link.id}>
                • {link.original_url} {"->"}{" "}
                <a href={link.short_url} target="_blank">
                  {link.short_url}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    )
  );
}
