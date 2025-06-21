/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";

export default function Skills(){
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const skillList = [
        { name: "HTML", level: "Certified", img: "/logo/HTML.png", description: "HTML is a Markup language for structuring web content. i use HTML for many of my project as a base of web developing" },
        { name: "CSS", level: "Certified", img: "/logo/CSS.png", description: "CSS is used for styling web pages. i use this for styling all of my project" },
        { name: "Javascript", level: "Certified", img: "/logo/JS.png", description: "JS is used to add interactivity to web applications. JS can be used to make a server side logic too even the intercation with db. i often use JS and TS on my project" },
        { name: "Typescript", level: "Experienced", img: "/logo/TS.png", description: "Typed superset of JavaScript. i used typescript for most of my project for both FE and BE" },
        { name: "Java", level: "Experienced", img: "/logo/Java.png", description: "Object-oriented programming language that i use to make a desktop aplication. i used to train my data structue and algorithm in java" },
        { name: "PHP", level: "Skilled", img: "/logo/PHP.png", description: "PHP is used to Server-side scripting. I use php for my internship project" },
        { name: "MySQL", level: "Experienced", img: "/logo/MySQL.png", description: "MySQL is used for relational database management system. this is a lightweight db that i often use in my project for my db" },
        { name: "ReactJS", level: "Experienced", img: "/logo/React.png", description: "JavaScript library for UI development. for my solo project even this web i use React and TS" },
        { name: "React Native", level: "Experienced", img: "/logo/React.png", description: "RN is used to build native apps using React. this was very helpful for me to make mobile APP using a web based-language structure" },
        { name: "NextJS", level: "Experienced", img: "/logo/Next.png", description: "React framework with SSR support. I used this framework for my react project routing management" },
        { name: "Tailwind", level: "Experienced", img: "/logo/Tailwind.png", description: "Utility-first CSS framework. this framework is very helpfull to make FE with CSS" },
        { name: "Firebase", level: "Skilled", img: "/logo/Firebase.png", description: "Platform for backend services. i use this db for realtime database like an chat applicatoin, etc." },
        { name: "Laravel", level: "Skilled", img: "/logo/Laravel.png", description: "PHP web application framework. i use this framework for my internship" },
        { name: "Github", level: "Experienced", img: "/logo/Github.png", description: "Code hosting and version control. this is very usefull to save the progress and colaborate with team project" }
      ];
      
return(
    <div className=" md:h-[100vh] w-[100vw] bg-[#22242d] text-white px-5 md:px-28 flex flex-col items-center gap-6">
        <div className='w-full border-b-2'> </div>
        <p className='font-bold text-lg md:text-5xl text-center'>SKILL</p>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-3 group">
      {
        skillList.map((skills, index) => (
          <div
            key={index}
            className="flex flex-col"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setFocusedIndex(focusedIndex === index ? null : index)}
          >
            {/* Skill Card */}
            <div className={`md:h-16 group-hover:opacity-50 flex justify-between items-center gap-2 rounded-md bg-[#323745] p-2 hover:opacity-100 md:hover:bg-gradient-to-r from-[#00b3c0] to-[#00ff48] hover:scale-105 transition-all duration-150 ${(focusedIndex === index) ? 'opacity-100 bg-gradient-to-r from-[#00b3c0] to-[#00ff48] scale-105' : ''}`}>
              <div className="flex items-center gap-2">
                <img className="w-6 h-6" src={skills.img} alt={skills.name} />
                <div>
                  <p className="font-bold">{skills.name}</p>
                  <p>{skills.level}</p>
                </div>
              </div>
              {
                skills.level === "Certified" && (
                  <a href={`/certificates/${skills.name}.pdf`} download className="text-xs bg-white text-black font-semibold px-2 py-1 rounded hover:bg-gray-200">
                    Download certificate
                  </a>
                )
              }
            </div>

            {/* Description shown on hover or focus */}
            {(hoveredIndex === index || focusedIndex === index) && (
              <div className="bg-[#323745] text-white text-sm mt-1 rounded-md p-2 shadow transition-opacity duration-200">
                {skills.description}
              </div>
            )}
          </div>
        ))
      }
    </div>
      <div>
        *besides on all skill that given above i always ready to learn more especially the skills that company need
      </div>
    </div>
)
}