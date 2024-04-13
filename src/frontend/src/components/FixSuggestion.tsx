import { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

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
    <div className="flex basis-full">
      <CodeEditor
        value={fixText}
        language="text"
        readOnly
        padding={0}
        style={{
          overflow: "scroll",
          height: "20rem",
        }}
      />
    </div>
  );
}
