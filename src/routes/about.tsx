import { data, useLoaderData, type HeadersArgs } from "react-router";

export async function loader() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data({
    date: new Date().toISOString(),
  });
}

export function headers(_: HeadersArgs) {
  return { "Cache-Control": "private, max-age=10" };
}

export default function AboutPage() {
  const data = useLoaderData<{ date: string }>();

  return (
    <>
      This is about page and will be lazy loaded
      <pre>
        <code>date: {data.date}</code>
      </pre>
    </>
  );
}
