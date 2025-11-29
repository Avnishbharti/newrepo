import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewSection = () => {
  const reviews = [
    {
      title: "Perfect Choice!!",
      rating: 5,
      text: "They Were Fantastic Through The Entire Purchase Process. I Had Lots Of Questions And They Were Patient. My System Arrived It Was Well Packed And Shipping With Xpo.",
      name: "Ahmed Abdallah",
      role: "Front End Developer",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPAQfc03o7FiZ1xqlgnOkGHXNh5sjm8hB72Z0a5XSENQExW1mn",
    },
    {
      title: "Excellent!!",
      rating: 5,
      text: "They Helped Lead Me Through The Process Of System Selection, Site Layout And Placing My Order. They Were Very Knowledgeable And Has Provided Guidance Each Step.",
      name: "John Peter",
      role: "Pro systems",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1rDH_nWadT1GXFPomdutqV1PUMA8uXIWS2Js5_fq4pJ1lwG16",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {reviews.map((review, i) => (
          <div key={i} className="space-y-6">
            {/* Icon & rating */}
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-500 p-5 rounded-full shadow-md">
                <FaQuoteLeft size={26} />
              </div>

              <div className="flex items-center gap-1 text-green-500">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-green-600">
              {review.title}
            </h3>

            {/* Text */}
            <p className="text-gray-700 leading-relaxed">{review.text}</p>

            {/* Profile */}
            <div className="flex items-center gap-4">
              <img
                src={review.img}
                alt="user"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
