import { useState } from "preact/hooks";

const HomePage = () => {
  async function getData() {
    const res = await (await fetch("/api")).json();
    setDataState(JSON.stringify(res, null, 2));
  }

  const [dataState, setDataState] = useState("");
  return (
    <>
      <s-page heading="Preact Template">
        <s-section>
          <s-stack direction="block">
            <s-text>Testing out the new template</s-text>
            {dataState ? (
              <>
                <s-text>Content: {dataState}</s-text>
              </>
            ) : null}
            <s-stack direction="inline" justifyContent="end">
              <s-button
                onClick={() => {
                  getData();
                }}
              >
                Make Call
              </s-button>
            </s-stack>
          </s-stack>
        </s-section>
      </s-page>
    </>
  );
};

export default HomePage;
