// app/booking/page.tsx
import BookingWizard from "@/components/booking/BookingWizard";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  // Await the searchParams promise
  const params = await searchParams;

  return (
    <div className="pt-40 pb-20">
      <div className="container-custom px-4">
        <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
        <p className="text-gray-600 mb-8">
          Complete your booking in 5 simple steps
        </p>

        <BookingWizard initialService={params.service} />
      </div>
    </div>
  );
}
