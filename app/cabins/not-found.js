// app/cabins/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>Cabin Not Found</h2>
      <p>Could not find the requested cabin.</p>
      <Link href="/cabins">View all cabins</Link>
    </div>
  );
}
