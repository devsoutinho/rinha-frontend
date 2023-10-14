import { JSONFile } from "@src/domain/JSONFile";
import React from "react";

interface LoadJSONScreenProps {
  error: string;
  setError: (error: string) => void;
  jsonFile: JSONFile;
  setJSONFile: (jsonFile: JSONFile) => void;
}
export function LoadJSONScreen({ error, setError, setJSONFile }: LoadJSONScreenProps) {
  const fileName = React.useRef("");

  return (
    <form>
      <h1>JSON Tree Viewer</h1>
      <p>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </p>
      <div>
        <label
          tabIndex={0}
          htmlFor="json-file"
          onKeyDown={function loadJSONKeyDownHandler(e) {
            const $label = e.target as HTMLLabelElement;
            const labelFor = $label.getAttribute("for");
            const isKeyboardClick = e.key === "Enter" || e.key === " ";
            if (isKeyboardClick) document.getElementById(labelFor).click();
          }}
        >
          Load JSON
        </label>

        <input
          id="json-file"
          name="json-file"
          type="file"
          onChange={function jsonInputChangeHandler(e) {
            const currentFile = e.target.files[0];
            if (currentFile.type !== "application/json") {
              setError("Invalid file. Please load a valid JSON file.");
              return;
            }

            fileName.current = currentFile.name;

            const jsonFileReader = new FileReader();

            function readerProgressHandler(e: ProgressEvent<FileReader>) {
              if (e.lengthComputable) {
                const percentLoaded = Math.round((e.loaded / e.total) * 100);
                console.log(percentLoaded);
              }
            }
        
            function readerLoadHandler(e: ProgressEvent<FileReader>) {
              const fileContent = e.target.result as string;
              try {
                JSON.parse(fileContent);
                globalThis.jsonFileContent = fileContent;
                setJSONFile({
                  contentGlobalKey: "jsonFileContent",
                  name: fileName.current,
                });
                setError("");
              } catch (err) {
                setError("Invalid JSON file. Please load a valid JSON file.");
              }
            }
        
            jsonFileReader.addEventListener("progress", readerProgressHandler);
            jsonFileReader.addEventListener("load", readerLoadHandler);

            jsonFileReader.readAsText(currentFile, "UTF-8");

            setError("");
          }}
          aria-invalid={error ? "true" : "false"}
          aria-describedby="json-file-error"
          aria-errormessage="json-file-error"
        />
        <p
          id="json-file-error"
          role="alert"
        >
          {error}
        </p>
      </div>
    </form>
  )
}
