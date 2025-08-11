"use client";

import { deleteReservationAction } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      // Use startTransition to ensure the action is handled in a non-blocking way
      // This allows the UI to remain responsive while the action is processed
      // If you are not using a form, you can use useTransition directly;
      startTransition(async () => deleteReservationAction(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          {" "}
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
