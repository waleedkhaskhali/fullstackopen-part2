// import React from "react";

// const Course = ({ courses }) => {
//   console.log(courses);
//   const course1Total = courses[0].parts.reduce(
//     (sum, part) => sum + part.exercises,
//     0
//   );
//   const course2Total = courses[1].parts.reduce(
//     (sum, part) => sum + part.exercises,
//     0
//   );

//   return (
//     <div>
//       <h1>{courses[0].name}</h1>
//       {courses[0].parts.map((part) => (
//         <div key={part.id}>
//           <p>{part.name}</p>
//           <span>{part.exercises}</span>
//         </div>
//       ))}
//       <p>Number of exercises {course1Total}</p>
//       <h1>{courses[1].name}</h1>
//       {courses[1].parts.map((part) => (
//         <div key={part.id}>
//           <p>{part.name}</p>
//           <span>{part.exercises}</span>
//         </div>
//       ))}
//       <p>Number of exercises {course1Total}</p>
//     </div>
//   );
// };

// export default Course;
