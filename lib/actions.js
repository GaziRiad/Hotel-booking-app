"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";

export async function UpdateGuestAction(formData) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid nationalID.");

  const updatedData = { nationality, countryFlag, nationalID };
  // Here you would typically call a function to update the guest's profile in your database

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  // Check if the bookingId is valid to users
  const bookings = await getBookings(session.user.guestId);

  if (!bookings.find((booking) => booking.id === bookingId))
    throw new Error("Booking does not exist");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" });
}
