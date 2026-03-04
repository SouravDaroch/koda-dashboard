export default function TopBar(){
    return  <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
    <h1 className="text-xl font-semibold md:hidden">Koda</h1>

    <div className="ml-auto flex items-center gap-4">
      <div className="h-8 w-8 rounded-full bg-gray-300" />
    </div>
  </div>
}