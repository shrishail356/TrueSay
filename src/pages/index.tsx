// /* eslint-disable react/no-unescaped-entities */
// import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import devconImg from "../../public/devcon.png";
// import TopicsList from "@/components/TopicList";

// export default function Home() {
//   const [anonAadhaar] = useAnonAadhaar();
//   const router = useRouter();

//   useEffect(() => {
//     if (anonAadhaar.status === "logged-in") {
//       router.push("./redeem");
//     }
//   }, [anonAadhaar, router]);

//   return (
//     <>
//       <main className="flex flex-col min-h-[75vh] mx-auto justify-center items-center w-full p-4">
//         <div className="max-w-4xl w-full">
//           <TopicsList topics={[]} />
//           <div className="flex w-full gap-8 mb-8">
//             <div>
//               <div className="flex gap-4 place-content-center">
//                 <LaunchProveModal
//                   nullifierSeed={Number(process.env.NEXT_PUBLIC_NULLIFIER_SEED)}
//                   buttonStyle={{
//                     borderRadius: "8px",
//                     border: "solid",
//                     borderWidth: "1px",
//                     boxShadow: "none",
//                     fontWeight: 500,
//                     borderColor: "#009A08",
//                     color: "#009A08",
//                     fontFamily: "rajdhani",
//                   }}
//                   buttonTitle={"Continue Applying for Discount"}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import devconImg from "../../public/devcon.png";
import TopicsList from "@/components/TopicList";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();
  const [topics, setTopics] = useState<any[]>([]); 

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics'); 
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTopics(data.topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);
  return (
      <TopicsList topics={topics} />
  );
}
