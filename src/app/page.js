export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Background Image */}
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('./images/asterisk-bg1.jpg')" }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Welcome to Our Website</h1>
        </div>
      </div>

      {/* Testimonials */}
      <section className="my-12 p-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">Testimonials</h2>
        <p className="text-gray-900 dark:text-gray-200">"This is a great service!" - User A</p>
        <p className="text-gray-900 dark:text-gray-200">"Highly recommend this platform!" - User B</p>
      </section>

      {/* About Us */}
      <section className="my-12 p-4 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          About Us
        </h2>
        <p className="text-gray-900 dark:text-gray-100">
          We are committed to delivering the best solutions. Our platform connects users and admins seamlessly.
        </p>
      </section>

      {/* Contact Us */}
      <section className="my-12 p-4 w-full max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          Contact Us
        </h2>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
