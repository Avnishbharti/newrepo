import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/nature1.jfif";
import img2 from "../assets/nature2.webp";
import img3 from "../assets/nature3.jpg";
import wind from "../assets/wind.jfif";
import { cards } from "../navData";
import solarImg from "../assets/service2.jpg";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import bgImg from "../assets/serviceimg.jpg";
import LogoInfiniteScroller from "./LogoInfiniteScroll";
import ReviewSection from "./ReviewSection";
import BlogsCarousel from "./BlogsCarousel";

const images = [img1, img2, img3];

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const rafIdRef = useRef(null);
  const runningRef = useRef(false);
  const pausedRef = useRef(false);
  const speedRef = useRef(1.2);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const step = () => {
    const container = scrollRef.current;
    if (!container) {
      rafIdRef.current = null;
      runningRef.current = false;
      return;
    }

    if (!pausedRef.current && !isDown) {
      container.scrollLeft += speedRef.current;
      const half = container.scrollWidth / 2;
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      }
    }

    rafIdRef.current = requestAnimationFrame(step);
  };

  const startAuto = () => {
    pausedRef.current = false;
    if (!runningRef.current) {
      runningRef.current = true;
      rafIdRef.current = requestAnimationFrame(step);
    }
  };

  const stopAuto = () => {
    pausedRef.current = true;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    runningRef.current = false;
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const onMouseDown = (e) => {
    stopAuto();
    setIsDown(true);
    const container = scrollRef.current;
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollRef.current = container.scrollLeft;
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const container = scrollRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startXRef.current;
    container.scrollLeft = startScrollRef.current - walk;
  };

  const onMouseUp = () => {
    setIsDown(false);
    setTimeout(() => {
      if (!pausedRef.current) startAuto();
    }, 30);
  };

  const onMouseLeave = () => {
    if (isDown) {
      setIsDown(false);
      setTimeout(() => {
        if (!pausedRef.current) startAuto();
      }, 30);
    }
  };

  const handleMouseEnter = () => {
    pausedRef.current = true;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      runningRef.current = false;
    }
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    if (!isDown) startAuto();
  };

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${images[index]})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center pl-8 md:pl-20 text-white max-w-3xl">
          <p className="text-sm md:text-base font-semibold tracking-wide mb-4">
            Complete Commercial, Residential & Industrial Solar Systems
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            We Invest In The <br /> Future Of Planet!
          </h1>

          <p className="text-base md:text-lg max-w-xl mb-6">
            As a worldwide distributor of solar supplies, we endeavor to provide
            fast and knowledgeable service. We can get you materials by sea or
            air.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              More About Us
            </button>

            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              More About Us!
            </button>
          </div>
        </div>

        <button
          onClick={prevImage}
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white text-4xl font-thin hover:opacity-80 cursor-pointer"
        >
          ❮
        </button>
        <button
          onClick={nextImage}
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white text-4xl font-thin hover:opacity-80 cursor-pointer"
        >
          ❯
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
          ${
            index === i ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
          }`}
            ></button>
          ))}
        </div>
      </section>
      <LogoInfiniteScroller />
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 items-center">
          <div className="relative">
            <img
              src={solarImg}
              alt="Solar Panels"
              className="w-full h-auto rounded-xl shadow-lg"
            />
            <div className="absolute right-10 -bottom-8 bg-green-600 text-white p-6 rounded-xl max-w-xs shadow-xl">
              <h3 className="text-xl font-semibold mb-2">
                Fostering Growth Of Solar Energy!
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                Benefiting from 20 years experience in the solar material
                procurement sector and PV manufacturing.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-green-600 font-semibold">
              A World Wide Distributor Of Solar Supplies
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Sustainable, Reliable & Affordable Energy!
            </h2>

            <p className="text-gray-600 leading-relaxed">
              The increase in extreme weather events and rising sea levels are
              unmistakable signs of climate change. Roughly 850 million people
              still without access to electricity, which is the foundation of
              sustainable development. How can we meet growing demand for
              electricity while protecting our climate?
            </p>

            <div className="pt-6">
              <div className="h-8 opacity-40">
                <img
                  src="https://dummyimage.com/120x40/ffffff/000000&text=Signature"
                  alt=""
                  className="opacity-60"
                />
              </div>

              <p className="text-lg font-semibold mt-2">Michael Brian</p>
              <p className="text-green-600 font-medium text-sm">
                Solatec Founder
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-green-400 font-medium mb-3">
              Making Tomorrow Different Today.
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Energize Society With <br /> Sustainable And Reliable <br />{" "}
              Energy Systems!
            </h2>
          </div>

          <div className="max-w-3xl mt-6 text-gray-300">
            New capacity across the solar value chain has become necessary to
            support PV market growth. Capital required to establish & scale
            wafer, solar cell, and module manufacturing facilities is high.
          </div>

          <button className="mt-8 flex items-center gap-2 bg-green-600 px-6 py-3 rounded-md hover:bg-green-700 transition">
            Explore All Features!
            <FiArrowRight />
          </button>

          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={(e) => {
              onMouseLeave(e);
              handleMouseLeave();
            }}
            onMouseEnter={handleMouseEnter}
            onMouseOver={handleMouseEnter}
            className="
              mt-14 flex gap-6 overflow-x-auto 
              cursor-grab active:cursor-grabbing
              select-none py-4 custom-scroll-hide
            "
            style={{ touchAction: "pan-y" }}
          >
            {[...cards, ...cards].map((item, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white text-black rounded-xl p-6 shadow"
              >
                <img src={item.img} className="w-12 mb-3" alt="" />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.text}</p>
                <div className="mt-4 text-green-600">
                  <FiArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-black text-white pt-20 pb-40">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div>
              <div className="flex items-center gap-2 text-green-500 text-xl">
                <span>★★★★★</span>
              </div>

              <p className="text-green-400 font-semibold mt-2 text-xl">
                99.9% Customer Satisfaction
              </p>

              <p className="text-gray-400 mt-1">
                based on 750+ reviews and 20,000 Objective Resource
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full">
        <div className="bg-white pb-20 mt-[-180px] relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 relative">
            <div className="bg-white rounded-r-xl p-10  z-50">
              <div className="border-l-4 border-green-600 pl-6">
                <p className="text-gray-700 leading-relaxed">
                  While improving the yield and performance of solar energy
                  products, our PV industry experience enables us to provide
                  in-depth material sourcing, financing and supply chain
                  expertise for every step.
                </p>

                <ul className="mt-6 space-y-4 text-gray-800">
                  <li>
                    ▪{" "}
                    <b>
                      Professional on-site service and support for
                      certification.
                    </b>
                  </li>
                  <li>
                    ▪{" "}
                    <b>
                      Regular light source for stable conversion efficiency.
                    </b>
                  </li>
                  <li>
                    ▪ <b>Lowest LID by periodic monitoring & superior wafer.</b>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT IMAGE AGAIN */}
            <div className="absolute -top-36 right-10 w-2xl">
              <img
                src={bgImg}
                className="rounded-xl shadow-xl w-full h-[390px] object-cover z-10"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <BlogsCarousel/>
      <ReviewSection/>
    </>
  );
};

export default HomePage;
