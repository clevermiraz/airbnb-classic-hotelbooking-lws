"use client";

import { Fragment, useRef } from "react";

export default function ClientProvider({ children }) {
    const fragmentRef = useRef();

    return <Fragment ref={fragmentRef}>{children}</Fragment>;
}
