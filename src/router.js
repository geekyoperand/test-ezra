import React, { lazy, Suspense } from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"

const routes = [
    // Public Pages
    {
        path: "/",
        Component: lazy(() => import("pages/Homepage")),
        exact: true,
    },
]

const Router = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, Component, exact }) => (
                    <Route
                        path={path}
                        key={path}
                        exact={exact}
                        element={
                            <Suspense fallback={null}>
                                <Component {...props} />
                            </Suspense>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default Router
