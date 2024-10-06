import React from "react";

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-[-5px] bg-gray-800 text-white text-xs rounded shadow py-1 px-3 z-40 transition-all duration-300 ease-in-out whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
