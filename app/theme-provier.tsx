'use client'

import React, { createContext } from "react"

export const ThemeContext = createContext({});

export default function ThemeProvider({
    children,
}:{
    children : React.ReactNode
}){
    return <ThemeContext.Provider  value="dark">{children}</ThemeContext.Provider>
};