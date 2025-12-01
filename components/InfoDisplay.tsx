import React from "react";

interface InfoDisplayProps {
  title: string;
  value: React.ReactNode;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ title, value }) => {
  return (
    <div className="bg-slate-700 py-2 px-3 rounded-lg w-full flex items-center justify-between gap-4">
      <span className="uppercase font-bold text-slate-400 tracking-wider whitespace-nowrap">
        {title}
      </span>

      <span className="uppercase font-bold text-white text-right truncate max-w-[60%]">
        {value}
      </span>
    </div>
  );
};

export default InfoDisplay;
