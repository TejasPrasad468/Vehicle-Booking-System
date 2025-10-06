export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex items-center justify-center">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-xl w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mb-3 text-center text-green-700 drop-shadow">
            Vehicle Booking Portal
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Book vehicles easily, manage reservations, and track your rides seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="/signup"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all text-center"
            >
              Sign Up Now
            </a>
            <a
              href="/login"
              className="bg-white border border-green-400 text-green-600 font-semibold py-2 px-6 rounded-lg shadow hover:bg-green-50 transition-all text-center"
            >
              Login
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-100 rounded-lg p-4 text-center shadow">
            <h2 className="font-bold text-green-700 mb-1">Book Vehicles</h2>
            <p className="text-xs text-gray-600">
              Reserve cars, bikes, or trucks easily in just a few clicks.
            </p>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-center shadow">
            <h2 className="font-bold text-blue-700 mb-1">Track Bookings</h2>
            <p className="text-xs text-gray-600">
              Monitor your booking status and upcoming rides.
            </p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4 text-center shadow">
            <h2 className="font-bold text-yellow-700 mb-1">Manage Fleet</h2>
            <p className="text-xs text-gray-600">
              Keep track of available vehicles and manage your fleet efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
