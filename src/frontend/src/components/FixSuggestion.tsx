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
    <div className="flex flex-col justify-center items-center w-full sm:w-8/12 lg:w-1/2 sm:px-10 lg:px-20 mt-28 md:mt-0">
      <CodeEditor
        value={fixText}
        language="text"
        readOnly
        onChange={(evn) => setFixText(evn.target.value)}
        padding={15}
        style={{
          overflow: "scroll",
          height: "20rem",
        }}
        className="mb-10"
      />
    </div>
  );
}
