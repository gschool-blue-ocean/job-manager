import React, { useState, useEffect } from "react";
import axios from "axios";
import DeliverableStatus from "./DeliverableStatus";

export default function StudentModalInfo({ student }) {
  const [deliverables, setDeliverables] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/deliverables/${student.id}`)
      .then((response) => {
        console.log("deliv req", response.data);
        setDeliverables(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving deliverable:", error);
      });
  }, [student.id]);

  return (
    <div className="text-white rounded-lg">
      {deliverables.map((deliverable, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex flex-row items-center">
            <p className="flex-shrink-0 w-32">{deliverable.name}</p>
            <a
              className="flex-shrink-0 ml-32"
              href={deliverable.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {deliverable.name}_url
            </a>
            <div className="flex-shrink-0 ml-auto">
              <DeliverableStatus index={index} deliverable={deliverable} />
            </div>
          </div>
          <div className="border-b border-white w-full mt-4 mb-2"></div>
        </div>
      ))}
    </div>
  );
}

// const renderListItem = (text, name) => {
//   return (
//     <li className="flex justify-between items-center mb-4 bg-gray-700 rounded-lg">
//       <div className="mr-24">{text}</div>
//       <div className="flex">
//         {options.map((option) => (
//           <React.Fragment key={option.value}>
//             <input type="radio" name={name} id={`${name}-${option.value}`} />
//             <label className="mr-2" htmlFor={`${name}-${option.value}`}>
//               {option.label}
//             </label>
//           </React.Fragment>
//         ))}
//       </div>
//     </li>
//   );
// };
