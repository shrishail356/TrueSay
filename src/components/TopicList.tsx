import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Footer from "./Footer";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, ReactPortal } from "react";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <AnonAadhaarProvider>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full animate-gradient bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 opacity-10"></div>
        <div className="sparkles z-0"></div>
        <div className="relative z-10 px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Welcome to TrueSay.xyz
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Where you get reviews for your products
          </p>

          {/* New Steps Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-gray-500 hover:border-blue-400 hover:bg-opacity-90 hover:shadow-xl hover:shadow-blue-500/50">
              <h2 className="text-lg font-semibold mb-2 text-white">Step 1</h2>
              <p className="text-gray-300 text-sm text-center">Create a link</p>
            </div>
            <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-gray-500 hover:border-blue-400 hover:bg-opacity-90 hover:shadow-xl hover:shadow-blue-500/50">
              <h2 className="text-lg font-semibold mb-2 text-white">Step 2</h2>
              <p className="text-gray-300 text-sm text-center">
                Share and your audience fill the details. Anon Aadhaar is
                compulsory for reducing spam comments and bot data.
              </p>
            </div>
            <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-gray-500 hover:border-blue-400 hover:bg-opacity-90 hover:shadow-xl hover:shadow-blue-500/50">
              <h2 className="text-lg font-semibold mb-2 text-white">Step 3</h2>
              <p className="text-gray-300 text-sm text-center">
                Upon successful transaction all testimonials will be displayed
                on the main page testimonials.
              </p>
            </div>
          </div>

          {/* Add Review Button */}
          <div className="mb-12">
            <Link href="/add">
              <p className="inline-block px-5 py-3 text-md font-semibold text-white bg-blue-600 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-700">
                Add Review
              </p>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((t: { _id: Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; bio: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; rating: number; description: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
              <div
                key={t._id}
                className="bg-black bg-opacity-20 p-6 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-gray-500 hover:border-blue-400 hover:bg-opacity-90 hover:shadow-xl hover:shadow-blue-500/50"
              >
                {t.image && (
                  <div className="mb-4">
                    <img
                      src={t.image}
                      //alt={t.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
                <h2 className="text-lg font-semibold mb-2 text-white">
                  {t.name}
                </h2>
                <p className="text-gray-300 text-sm mb-4 text-center">{t.bio}</p>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 font-bold mr-2">Rating:</span>
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < t.rating ? "#ffc107" : "#e4e5e9"}
                      className="text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-center">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </AnonAadhaarProvider>
  );
}
