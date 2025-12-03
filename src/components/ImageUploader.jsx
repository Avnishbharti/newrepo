import React, { useRef, useState, useEffect } from "react";

export default function ImageUploader({
  value = null,
  onChange = () => {},
  uploadUrl = "/api/images/upload",
  placeholder = "Click to upload image",
}) {
  const fileRef = useRef();
  const [fileData, setFileData] = useState(null);
  const [preview, setPreview] = useState(null);

  // Sync value from parent
  useEffect(() => {
    setFileData(value);
  }, [value]);

  // Accept only image types
  const imageTypes = "image/*";

  // Upload to API
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json(); // { id, url, name }

    setFileData(data);
    onChange(data);
  };

  return (
    <>
      {/* Upload Box */}
      <div
        onClick={() => fileRef.current.click()}
        className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer bg-white 
                   hover:bg-gray-50 flex items-center justify-between"
      >
        {fileData ? (
          <div className="flex items-center gap-3">
            <img
              src={fileData.url}
              alt={fileData.name}
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-gray-700">{fileData.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}

        {/* Preview Button */}
        {fileData && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreview(fileData.url);
            }}
            className="text-blue-600 underline text-sm"
          >
            Preview
          </button>
        )}

        <input
          type="file"
          accept={imageTypes}
          ref={fileRef}
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {/* Image Preview Modal */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={preview}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}




// const [image, setImage] = useState(null);

// <ImageUploader
//   value={image}
//   onChange={setImage}
//   uploadUrl="/api/images/upload"
// />;
