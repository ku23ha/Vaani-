import { useState, useEffect } from "react";
import DigitalSahayakApp from "../components/DigitalSahayak";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-amber-800 font-medium font-sans">Initializing Digital Sahayak...</p>
        </div>
      </div>
    );
  }

  return <DigitalSahayakApp />;
}
