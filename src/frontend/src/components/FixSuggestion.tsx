import { useEffect, useState } from "react";

export default function FixSuggestions() {
  const [fixText, setFixText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/fixes");
        const data = await response.text();
        setFixText(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-black dark:text-white">{fixText}</h1>
    </div>
  );
}
