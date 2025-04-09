"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type TableContextType = {
  selectedTable: string
  setSelectedTable: (table: string) => void
  customerName: string
  setCustomerName: (name: string) => void
}

const TableContext = createContext<TableContextType | undefined>(undefined)

export function TableProvider({ children }: { children: ReactNode }) {
  const [selectedTable, setSelectedTable] = useState("4")
  const [customerName, setCustomerName] = useState("Floyd Miles")

  return (
    <TableContext.Provider value={{ selectedTable, setSelectedTable, customerName, setCustomerName }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}
