import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUrl } from "../api";

const getUserLinks = async () => {
  const response = await fetch("/api/links");
  const links = await response.json();
  return links;
};

export function Links() {
  const queryClient = useQueryClient();
  const { data: links, isLoading: isLinksLoading } = useQuery({
    queryKey: ["links"],
    queryFn: getUserLinks,
  });

  const deleteLinkMutation = useMutation(deleteUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries("links");
    },
  });

  // TODO: implement modal with confirmation, maybe shadcn/ui?
  const handleDeleteLink = (id: string) => deleteLinkMutation.mutate(id);

  if (isLinksLoading) {
    return <div>Loading...</div>;
  }

  if (links.length === 0) {
    return <div>No links found.</div>;
  }

  return (
    links.length && (
      <div className="flex justify-start flex-col mb-4 gap-8">
        <h2 className="text-xl text-center">Your existing links:</h2>
        <ul>
          {links.map(
            (link: { id: string; short_url: string; original_url: string }) => (
              <li key={link.id} className="flex flex-row justify-between mb-2">
                <div className="flex items-center">
                  <span>
                    • {link.original_url} {"->"}{" "}
                  </span>
                  <a href={link.short_url} target="_blank" className="ml-2">
                    {link.short_url}
                  </a>
                </div>
                <button
                  className="p-2 ml-4"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  <TrashIcon />
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    )
  );
}
