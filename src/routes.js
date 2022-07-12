import React from "react";
import { Route, Routes, } from "react-router-dom";

import Home from "./page/Home/index.js";
import Category from "./page/Category/index.js";
import Edit from "./page/Edit/index.js";


export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/edit" element={<Edit />} />
        </Routes>
    );
}