type UrlFormProps = {
  postUrl: (url: string) => void;
};

export function UrlForm({ postUrl }: UrlFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputData = formData.get("url") as string;
    const url = inputData.startsWith("https")
      ? inputData
      : `https://${inputData}`;
    postUrl(url);
  };
  return (
    <form
      className="flex flex-col gap-4 max-w-screen-md"
      onSubmit={handleSubmit}
    >
      <label className="text-xl text-center">Paste your url:</label>
      <input type="text" className="p-2" name="url" />
      <button type="submit">Submit</button>
    </form>
  );
}
