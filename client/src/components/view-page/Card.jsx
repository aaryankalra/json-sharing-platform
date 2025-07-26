import React from "react";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";

const Card = ({ title, content, date }) => {
  return (
    <div className="p-6 botder border-gray-200 flex flex-col gap-3">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p>
          <span className="mr-2 font-semibold">Created At:</span>
          {date}
        </p>
      </div>
      <div>
        <CodeMirror
          value={JSON.stringify(content, null, 2)}
          height="400px"
          extensions={[json()]}
          theme="light"
          editable={false}
          className="border border-base-300 font-mono"
        />
      </div>
    </div>
  );
};

export default Card;
