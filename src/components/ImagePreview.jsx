import React, { useState, useEffect, cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImagePreview({ children, images = [] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const isMultiple = images.length > 1;

  // ESC-to-close
  useEffect(() => {
    if (!open) return;
    const handleClose = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, [open]);

  const openPreview = (idx = 0) => {
    setIndex(idx);
    setOpen(true);
  };

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      {/* CHILD AS TRIGGER */}
      {cloneElement(children, {
        onClick: () => openPreview(0),
      })}

      {/* FULLSCREEN PREVIEW */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              {/* CLOSE BUTTON */}
              <button
                className="absolute top-3 right-3 bg-black/70 p-2 rounded-full text-white"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>

              {/* PREVIOUS */}
              {isMultiple && (
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white"
                  onClick={prev}
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {/* IMAGE */}
              <img
                src={images[index]}
                className="max-w-[85vw] max-h-[85vh] object-contain rounded-md"
                alt="preview"
              />

              {/* NEXT */}
              {isMultiple && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white"
                  onClick={next}
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
