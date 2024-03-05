import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import LandingPage from "./LandingPage";

const globalQueryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <LandingPage />
    </QueryClientProvider>
  );
}

export default App;
