import { type LoaderFunction, type MetaFunction } from "react-router";

import Home from "@/components/modules/home";

export const meta: MetaFunction = () => {
  return [
    { title: "React + Vite + React Router" },
    {
      name: "description",
      content: "Welcome to React + Vite + React Router template!",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  return null;
};

export default function HomePage() {
  return <Home />;
}
