"use client";
import React from "react";
import { LoadJSONScreen } from "@src/screens/LoadJSONScreen";
import { DisplayJSONScreen } from "@src/screens/DisplayJSONScreen";
import { JSONFile } from "@src/domain/JSONFile";

export default function HomeScreen() {
  const [error, setError] = React.useState("");
  const jsonFileMock = true ? {
    name: "alltypes.mock.json",
    contentGlobalKey: "mock",
  } : null;

  const [jsonFile, setJSONFile] = React.useState<JSONFile>(jsonFileMock);

  globalThis.mock = mock();

  return (
    <main>
      {jsonFile && <DisplayJSONScreen jsonFile={jsonFile} />}
      {!jsonFile && <LoadJSONScreen error={error} setError={setError} jsonFile={jsonFile} setJSONFile={setJSONFile} />}
    </main>
  );
}

function mock() {
  return `{
    "Actors": [
      {
        "name": "Tom Cruise",
        "age": 56,
        "Born At": "Syracuse, NY",
        "Birthdate": "July 3, 1962",
        "photo": "https://jsonformatter.org/img/tom-cruise.jpg",
        "wife": null,
        "weight": 67.5,
        "hasChildren": true,
        "hasGreyHair": false,
        "children": [
          "Suri",
          "Isabella Jane",
          "Connor"
        ]
      },
      {
        "name": "Robert Downey Jr.",
        "age": 53,
        "Born At": "New York City, NY",
        "Birthdate": "April 4, 1965",
        "photo": "https://jsonformatter.org/img/Robert-Downey-Jr.jpg",
        "wife": "Susan Downey",
        "weight": 77.1,
        "hasChildren": true,
        "hasGreyHair": false,
        "children": [
          "Indio Falconer",
          "Avri Roel",
          "Exton Elias"
        ]
      }
    ]
  }`;
}
