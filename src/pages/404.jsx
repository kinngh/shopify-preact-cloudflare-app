import { useRouter } from "@attayjs/client";

const NotFound = () => {
  const router = useRouter();
  return (
    <section>
      <h1>404: Not Found</h1>
      <p>It's gone :(</p>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go back home
      </button>
    </section>
  );
};

export default NotFound;
