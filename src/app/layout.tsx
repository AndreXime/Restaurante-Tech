import type { ReactNode } from "react"
import { TableProvider } from "../contexts/table-context"
import "../app/globals.css"

// Importação direta do componente SidebarNav
import { SidebarNav } from "../components/layout/sidebar-nav"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <TableProvider>
          <div className="flex h-screen bg-gray-100">
            <SidebarNav />
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          </div>
        </TableProvider>
      </body>
    </html>
  )
}
