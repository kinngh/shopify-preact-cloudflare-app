//? Testing if CF functions support is proper in local

import { useState } from "preact/hooks";

const HomePage = () => {
  async function getData() {
    const res = await (await fetch("/api")).json();
    setDataState(JSON.stringify(res, null, 2));
  }

  const [dataState, setDataState] = useState("");
  return (
    <>
      <p>Home Page</p>
      <button
        onClick={async () => {
          await getData();
        }}
      >
        Make call
      </button>
      <br />
      <br />
      <br />
      <p>{dataState}</p>
    </>
  );
};

export default HomePage;
