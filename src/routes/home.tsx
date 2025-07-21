import type { LoaderFunction, MetaFunction } from "react-router";

import Home from "@/components/modules/home";
// import { CustomError } from "@/utils/react-query";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const loader: LoaderFunction = async () => {
  // throw new CustomError("This is a custom error message", {
  //   statusCode: 500,
  //   // message: "An error occurred while loading the home page.",
  // });
};

export default function HomePage() {
  return <Home />;
}
