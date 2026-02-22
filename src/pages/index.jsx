import { useRouter } from "@attayjs/client";
import { useState } from "preact/hooks";

const HomePage = () => {
  async function getData() {
    const res = await (await fetch("/api")).json();
    setDataState(JSON.stringify(res, null, 2));
  }

  const [dataState, setDataState] = useState("");
  const router = useRouter();
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
            <s-stack direction="inline" justifyContent="end" gap="base">
              <s-button
                variant="primary"
                onClick={() => {
                  getData();
                }}
              >
                Make Call
              </s-button>
              <s-button
                onClick={() => {
                  router.push("/page2");
                }}
              >
                Page 2
              </s-button>
            </s-stack>
          </s-stack>
        </s-section>
      </s-page>
    </>
  );
};

export default HomePage;
