import { ReservationCalendar } from "../../components/reservations/reservation-calendar"
import { ReservationForm } from "../../components/reservations/reservation-form"
import { SimpleHeader } from "../../components/layout/simple-header"

export default function ReservationsPage() {
  return (
    <div className="flex flex-col h-full">
      <SimpleHeader title="Reservas" />
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        <div className="flex-1 overflow-auto">
          <ReservationCalendar />
        </div>
        <div className="w-full lg:w-[380px] bg-white border rounded-lg">
          <ReservationForm />
        </div>
      </div>
    </div>
  )
}
