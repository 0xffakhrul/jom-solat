import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrayerTimes } from "./components/PrayerTimes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <PrayerTimes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
