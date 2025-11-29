import React, { useRef, useEffect } from "react";
import img1 from "../assets/nature1.jfif";
import img2 from "../assets/nature2.webp";
import img3 from "../assets/nature3.jpg";

const BlogsCarousel = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // drag speed
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);

  const blogs = [
    {
      img: img1,
      category: "Oil & Gas, Insights",
      author: "Mike Dooley",
      date: "Jan 20, 2020",
      title: "Filing Solar Power Permits In 2020? Important Factors",
      desc: "All of these factors are important to consider...",
    },
    {
      img: img2,
      category: "Oil & Gas, Insights",
      author: "Mike Dooley",
      date: "Jan 20, 2020",
      title: "Filing Solar Power Permits In 2020? Important Factors",
      desc: "Batteries are the most expensive part...",
    },
    {
      img: img3,
      category: "Oil & Gas, Insights",
      author: "Mike Dooley",
      date: "Jan 20, 2020",
      title: "Filing Solar Power Permits In 2020? Important Factors",
      desc: "Department of Energy has funded teams...",
    },
  ];

  // duplicate for smooth infinite scroll
  const infiniteBlogs = [...blogs, ...blogs];

  return (
    <section className="py-20 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">Latest Blog Posts</h2>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-10 whitespace-nowrap no-scrollbar auto-slider cursor-grab"
        >
          {infiniteBlogs.map((blog, index) => (
            <div
              key={index}
              className="w-[350px] bg-white rounded-xl shadow-md shrink-0"
            >
              <div className="relative">
                <img
                  src={blog.img}
                  className="w-full h-52 object-cover rounded-t-xl"
                />
                <span className="absolute bottom-2 right-2 bg-white text-gray-800 text-xs px-3 py-1 rounded shadow">
                  {blog.date}
                </span>
              </div>

              <div className="p-5 flex flex-wrap">
                <p className="text-green-600 text-sm font-medium">
                  {blog.category} • {blog.author}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-wrap">
                  {blog.title}
                </h3>

                <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                  {blog.desc}
                </p>

                <button className="mt-5 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto scroll CSS */}
      <style>{`
        .auto-slider {
          animation: smoothScroll 40s linear infinite;
        }
        .auto-slider.active {
          animation-play-state: paused;
        }
        .auto-slider:hover {
          animation-play-state: paused;
        }

        @keyframes smoothScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default BlogsCarousel;
