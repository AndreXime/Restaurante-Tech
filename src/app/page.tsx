import { CategoryFilter } from "../components/menu/category-filter"
import { FoodGrid } from "../components/menu/food-grid"
import { Cart } from "../components/menu/cart"
import { Header } from "../components/layout/header"

export default function MenuPage() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1 flex overflow-hidden p-4">
        <div className="flex-1 overflow-auto">
          <CategoryFilter />
          <FoodGrid />
        </div>
        <Cart />
      </div>
    </div>
  )
}
