"use client";
import { useState } from "react";
export default function Comments() {
  const data = [
    {
      id: 1,
      name: "Sadman Ahmed",
      description: "Frontend developer skilled in React and Next.js.",
    },
    {
      id: 2,
      name: "Rahim Uddin",
      description: "Backend engineer experienced in Node.js and Express.",
    },
    {
      id: 3,
      name: "Karim Hasan",
      description:
        "UI/UX designer passionate about clean and modern interfaces.",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      description: "Digital marketer specializing in social media campaigns.",
    },
    {
      id: 5,
      name: "Tanvir Hossain",
      description:
        "Full-stack developer with expertise in MERN stack projects.",
    },
    {
      id: 6,
      name: "Mehedi Islam",
      description: "Mobile app developer focused on Android and Flutter apps.",
    },
    {
      id: 7,
      name: "Ayesha Akter",
      description: "Content writer creating engaging blogs and website copy.",
    },
    {
      id: 8,
      name: "Sabbir Khan",
      description:
        "Database administrator managing secure and scalable systems.",
    },
    {
      id: 9,
      name: "Farzana Rahman",
      description: "Project manager leading teams to deliver software on time.",
    },
    {
      id: 10,
      name: "Kamal Hassan",
      description: "Project manager leading teams to deliver software on time.",
    },
    {
      id: 11,
      name: "Rakib Ahmed",
      description: "Project manager leading teams to deliver software on time.",
    },
    {
      id: 12,
      name: "Farukh Ahmed",
      description: "Project manager leading teams to deliver software on time.",
    },
  ];

  const [searchTerm, setsearchTerm] = useState("");

  // const handleSearch = (e) => {
  //   setsearchTerm(e.target.value);
  // };
  const handleSearch = (e) => {
    setsearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-500 items-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-2 py-1 border border-white focus:outline-gray-300 rounded-md placeholder-white mt-8"
        />
        <div className="mt-10">
          {filteredData.map((item, index) => (
            <div key={index} className="mt-4 border p-4 bg-white rounded-lg">
              <h2 className="text-lg ">{item.name}</h2>
              <p className="text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
