import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const CopyToClipboard = ({ roomid }) => {
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    const text = roomid;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Copied"))
        .catch((err) => console.error("Failed to copy: ", err));
    } else {
      inputRef.current.select();
      document.execCommand("copy");
      alert("Copied to clipboard: " + text);
    }
  };

  return (
    <div>
      <button onClick={copyToClipboard} className="edit-btn room-id">
        Copy ROOM ID
      </button>
    </div>
  );
};

export default CopyToClipboard;
