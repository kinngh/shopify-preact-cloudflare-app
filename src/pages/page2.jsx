import { useRouter } from "@attayjs/client";

const PageTwo = () => {
  const router = useRouter();
  return (
    <>
      <s-page>
        <s-section>
          <s-text>This is some text</s-text>
          <s-stack direction="inline" justifyContent="end">
            <s-button
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </s-button>
          </s-stack>
        </s-section>
      </s-page>
    </>
  );
};

export default PageTwo;
