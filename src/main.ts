import { mount } from "svelte";

import "./app.css";
import App from "./app.svelte";

const appElement = document.getElementById("app");

if (!appElement) {
  throw new Error("App element not found");
}

const app = mount(App, { target: appElement });

export default app;
