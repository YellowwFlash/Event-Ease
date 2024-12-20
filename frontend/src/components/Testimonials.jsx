// import { testimonials } from "../constants";

// const Testimonials = () => {
//   return (
//     <div className="mt-20 tracking-wide">
//       <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
//         What People are saying
//       </h2>
//       <div className="flex flex-wrap justify-center">
//         {testimonials.map((testimonial, index) => (
//           <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
//             <div className="bg-neutral-100 rounded-md p-6 text-md border border-neutral-800 font-thin">
//               <p>{testimonial.text}</p>
//               <div className="flex mt-8 items-start">
//                 <img
//                   className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
//                   src={testimonial.image}
//                   alt=""
//                 />
//                 <div>
//                   <h6>{testimonial.user}</h6>
//                   <span className="text-sm font-normal italic text-neutral-600">
//                     {testimonial.company}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;




import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components"; // it is downloaded
import { testimonials } from "../constants"; // Ensure this path is correct

// Define keyframes animation
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled components
const AnimatedDiv = styled.div`
  animation: ${slideInFromRight} 0.6s ease-out forwards;
`;

const HiddenDiv = styled.div`
  opacity: 0;
`;

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing after it becomes visible
          }
        });
      },
      { threshold: 0.1 }
    );

    testimonialsRef.current.forEach((element) => {
      if (element) {
        // Only observe if the element exists
        observer.observe(element);
      }
    });

    return () => {
      testimonialsRef.current.forEach((element) => {
        if (element) {
          // Only unobserve if the element exists
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => (testimonialsRef.current[index] = el)}
            className={`w-full sm:w-1/2 lg:w-1/3 px-4 py-2 transition-transform ${isVisible ? "animate-slide-in" : ""
              }`}
          >
            {isVisible ? (
              <AnimatedDiv className="bg-neutral-100 rounded-md p-6 text-md border border-neutral-800 font-thin">
                <p>{testimonial.text}</p>
                <div className="flex mt-8 items-start">
                  <img
                    className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                    src={testimonial.image}
                    alt=""
                  />
                  <div>
                    <h6>{testimonial.user}</h6>
                    <span className="text-sm font-normal italic text-neutral-600">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </AnimatedDiv>
            ) : (
              <HiddenDiv className="bg-neutral-100 rounded-md p-6 text-md border border-neutral-800 font-thin">
                <p>{testimonial.text}</p>
                <div className="flex mt-8 items-start">
                  <img
                    className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                    src={testimonial.image}
                    alt=""
                  />
                  <div>
                    <h6>{testimonial.user}</h6>
                    <span className="text-sm font-normal italic text-neutral-600">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
              </HiddenDiv>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
