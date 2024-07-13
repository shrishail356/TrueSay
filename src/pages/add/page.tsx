"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAnonAadhaar } from "@anon-aadhaar/react";

export default function AddTopic() {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const account = useAccount();
  const router = useRouter();
  const [anonAadhaar] = useAnonAadhaar();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description || !bio) {
      alert("Name, bio, and description are required.");
      return;
    }

    const data = {
      name,
      bio,
      rating,
      description,
      image,
    };

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormSubmitted(true);
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.left}>
          <Link href="/" style={styles.link}>
            TrueSay
          </Link>
        </div>
        <div style={styles.right}>
          {account.isConnected && (
            <Link href="/anon-login" style={styles.button}>
              Anon Login
            </Link>
          )}
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </nav>

      <div className="relative h-screen bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full animate-gradient bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 opacity-10"></div>
        <div className="sparkles z-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Give Review for TrueSay.xyz
          </h1>
          {!account.isConnected ? (
            <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md text-center">
              <p>Connect your wallet to add a review</p>
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>
          ) : (
            !formSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-black bg-opacity-10 text-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md z-20"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 p-2 rounded-md bg-transparent focus:outline-none"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    className="w-full border border-gray-300 p-2 rounded-md bg-transparent focus:outline-none"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Star Rating
                  </label>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            className="hidden"
                            onClick={() => setRating(ratingValue)}
                          />
                          <FaStar
                            className="cursor-pointer"
                            color={
                              ratingValue <= (hover || rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="description"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="description"
                    className="w-full border border-gray-300 p-2 rounded-md bg-transparent focus:outline-none"
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="file">
                    Upload Your Picture
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="w-full border border-gray-300 p-2 rounded-md bg-transparent focus:outline-none"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="bg-white bg-opacity-20 text-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md text-center">
                <p>
                  Your entry has been made and you can view your testimonial on our
                  main page.
                </p>
                <p>Thank you for your review!</p>
                <Link href="/">
                  <p className="block mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">
                    Go to Main Page
                  </p>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    borderBottom: "1px solid #ccc",
  },
  left: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#000",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    marginRight: "20px",
  },
  button: {
    textDecoration: "none",
    color: "#007bff",
    marginRight: "10px",
  },
} as const;
