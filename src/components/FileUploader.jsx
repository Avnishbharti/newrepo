import React, { useRef, useState, useEffect } from "react";

const FileUploader = ({
  uploadUrl = "/api/images/upload",
  value = [],     // array of uploaded files [{id,name,url}]
  onChange = () => {},
  multiple = true,
  accept = "*",   // accept all file types by default
}) => {
  const fileRef = useRef();
  const [files, setFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Sync files from parent
useEffect(() => {
  if (Array.isArray(value)) {
    // Only update if different
    const isSame =
      JSON.stringify(value) === JSON.stringify(files);

    if (!isSame) {
      setFiles(value);
    }
  }
}, [value]);


  // Upload Files to API
  const handleUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles.length) return;

    const uploadedList = [];

    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); 
      // Ensure response contains: { id, url, name }

      uploadedList.push({
        id: data.id,
        url: data.url,
        name: data.name,
      });
    }

    const updated = [...files, ...uploadedList];
    setFiles(updated);
    onChange(updated); // send to parent
  };

  const removeFile = (id) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onChange(updated);
  };

  const isImage = (name) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
  };

  return (
    <>
      {/* Upload Box */}
      <div
        onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer text-center hover:bg-gray-50"
      >
        <p className="text-gray-600">Click to upload files</p>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          ref={fileRef}
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {/* Uploaded File List */}
      <div className="mt-4 space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {isImage(file.name) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-sm">
                  {file.name.split(".").pop().toUpperCase()}
                </div>
              )}

              <div>
                <p className="font-medium">{file.name}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {/* Preview button only for images */}
              {isImage(file.name) && (
                <button
                  onClick={() => setPreviewImage(file.url)}
                  className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                >
                  Preview
                </button>
              )}

              <button
                onClick={() => removeFile(file.id)}
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default FileUploader;



//  <FileUploader
//         uploadUrl="/api/images/upload"
//         value={uploadedFiles}
//         onChange={setUploadedFiles}
//         multiple={true}
//         accept="*"
//       />
