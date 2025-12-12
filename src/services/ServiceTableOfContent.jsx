import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ServiceTableOfContent = () => {
  const services = useSelector((state) => state.service.allServiceList);
  const [active, setActive] = useState(services[0]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN */}
          <div className="bg-green-100 rounded-xl p-8 shadow-sm h-fit sticky top-6">
            <div className="space-y-4">
              {services.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActive(item)}
                  className={`flex items-center p-2 rounded-lg shadow cursor-pointer transition 
                    ${
                      active.id === item.id
                        ? "bg-white shadow-md"
                        : "bg-white/90 hover:bg-white"
                    }`}
                >
                  <ArrowRight className="text-green-700 text-lg mr-3 h-4 w-4" />
                  <p className="font-semibold text-[15px]">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - HTML CONTENT */}
          <div className="lg:col-span-2 max-h-screen overflow-auto">
            <div
              className="prose max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: active.fullDescription }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTableOfContent;
