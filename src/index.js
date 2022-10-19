import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserHistory } from "history"
import Router from "./router"
import "antd/dist/antd.min.css"
import "main.scss"

const history = createBrowserHistory()
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<Router history={history} />)
