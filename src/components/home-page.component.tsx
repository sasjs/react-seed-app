import React from "react";

const HomePageComponent = () => {
  const homePageStyle = {
    padding: "16px",
    color: "#1c1c1c",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center"
  };
  const codeStyle = {
    fontFamily: "Monaco, Courier, monospace",
    border: "1px solid #d9d9d9",
    padding: "5px",
    borderRadius: "3px",
    backgroundColor: "#4a3f3f",
    color: "#f79205"
  };

  return (
    <div style={homePageStyle}>
      <h1>
        Hello!{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <h3>
        Welcome to the React Seed App for <span style={codeStyle}>SASjs</span>.
      </h3>
      <div>
        App Source Code:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/macropeople/react-seed-app"
        >
          https://github.com/macropeople/react-seed-app
        </a>
      </div>
      <br />
      <div>
        <span style={codeStyle}>SASjs</span> Source Code:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/macropeople/sasjs"
        >
          https://github.com/macropeople/sasjs
        </a>
      </div>
      <br />
      <div>
        <span style={codeStyle}>SASjs</span> on NPM:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.npmjs.com/package/sasjs"
        >
          https://www.npmjs.com/package/sasjs
        </a>
      </div>
    </div>
  );
};

export default HomePageComponent;
