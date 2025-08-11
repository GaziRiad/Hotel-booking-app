import EditReservationForm from "@/components/EditReservationForm";
import { getBooking, getCabin } from "@/lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = await params;

  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  const { numGuests, observations } = booking;
  const { maxCapacity } = cabin;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <EditReservationForm
        data={{ maxCapacity, observations, numGuests }}
        bookingId={bookingId}
      />
    </div>
  );
}
