import { Link } from "react-router";
import { cx } from "@styled-system/css";

import { homeCss } from "./styles";

const Home = () => {
  return (
    <div className={cx("home", homeCss)}>
      <div className="text-wrapper">
        <h1 className="home__title">
          Welcome to{" "}
          <Link
            to="https://github.com/fransiscushermanto/react-vite-template"
            rel="noreferrer noopener"
            target="_blank"
          >
            react-vite-template
          </Link>
        </h1>
        <h2 className="home__subtitle">
          This is a template for Vite + React + TypeScript + Panda CSS + SSR
        </h2>
      </div>

      <div className="home__cards">
        <div className="home__cards__card">
          <Link
            to="https://vite.dev/guide/ssr"
            rel="noreferrer noopener"
            target="_blank"
          >
            <h3>SSR</h3>
            <p>Server-side rendering with Vite and React.</p>
          </Link>
        </div>
        <div className="home__cards__card">
          <Link
            to="https://panda-css.com/docs/overview/getting-started"
            rel="noreferrer noopener"
            target="_blank"
          >
            <h3>Panda CSS</h3>
            <p>Utility-first CSS framework for styling.</p>
          </Link>
        </div>
        <div className="home__cards__card">
          <Link
            to="https://tanstack.com/query/latest/docs/framework/react/overview"
            rel="noreferrer noopener"
            target="_blank"
          >
            <h3>React Query</h3>
            <p>Data fetching and state management with React Query.</p>
          </Link>
        </div>
        <div className="home__cards__card">
          <Link
            to="https://vite.dev/guide/"
            rel="noreferrer noopener"
            target="_blank"
          >
            <h3>Vite</h3>
            <p>Fast and modern build tool for React applications.</p>
          </Link>
        </div>
      </div>

      <p className="footer-notes">
        For more information please read{" "}
        <Link
          to="https://github.com/fransiscushermanto/react-vite-template/blob/main/README.md"
          rel="noreferrer noopener"
          target="_blank"
        >
          README.md
        </Link>
      </p>
    </div>
  );
};

export default Home;
