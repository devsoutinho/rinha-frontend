"use client";
import React from "react";
import { LoadJSONScreen } from "@src/screens/LoadJSONScreen";
import { DisplayJSONScreen } from "@src/screens/DisplayJSONScreen";
import { JSONFile } from "@src/domain/JSONFile";

export default function HomeScreen() {
  const [error, setError] = React.useState("");
  const [jsonFile, setJSONFile] = React.useState<JSONFile>(null);

  return (
    <main>
      {jsonFile && <DisplayJSONScreen jsonFile={jsonFile} />}
      {!jsonFile && <LoadJSONScreen error={error} setError={setError} jsonFile={jsonFile} setJSONFile={setJSONFile} />}
    </main>
  );
}
