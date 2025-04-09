export function SimpleHeader({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 flex items-center gap-4 border-b">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  )
}
