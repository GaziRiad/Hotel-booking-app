import { getBookedDatesByCabinId, getCabins } from "@/lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabins(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    console.log(cabin);

    return Response.json({
      status: "success",
      data: { cabin, bookedDates },
    });
  } catch (err) {
    return Response.json({ status: "faild", message: "cabin not found!" });
  }
}

// export async function POST() {}
