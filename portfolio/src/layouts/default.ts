import type { Layout } from "vagejs";
import { shell } from "./shell.ts";

// Plain pages (about, contact, 404): a narrow reading column.
const layout: Layout = (props) => shell(props, `<article class="prose page">${props.content}</article>`);

// vagejs adds description, canonical, Open Graph and JSON-LD tags before </head>
// unless this layout already writes them.
export default layout;
