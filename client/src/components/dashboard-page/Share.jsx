import { Share2 } from "lucide-react";
import React, { useState } from "react";

const Share = ({ file, modalID }) => {
  const [copied, setCopied] = useState(false);
  const publicURL = `${window.location.origin}/json/${file.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 8000);
  };

  return (
    <div>
      <button
        className="sm:btn btn-ghost hover:bg-orange-300"
        onClick={() => document.getElementById(modalID).showModal()}
      >
        <Share2 size={18} />
        <span className="hidden md:flex">Share</span>
      </button>
      <dialog id={modalID} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                value={publicURL}
                readOnly
                className="input w-full text-gray-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <button
                  className="btn w-full hover:bg-green-300"
                  onClick={handleCopy}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div>
                <form method="dialog">
                  <button className="btn hover:bg-red-300 w-full">Close</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Share;
