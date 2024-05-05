import { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function FixSuggestions() {
  const [fixText, setFixText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/get-violations");
        const data = await response.text();
        setFixText(data);
      } catch (error) {
        console.error("Error fetching violation text:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-start items-center w-full basis-full pt-2 pb-0 z-0">
      <CodeEditor
        readOnly
        value={fixText}
        language="js"
        data-color-mode={localStorage.theme}
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "20rem",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}
