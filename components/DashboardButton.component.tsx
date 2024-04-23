import React from "react";

interface DashboardButtonProps {
  id: number;
  title: string;
  imageUrl: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({
  id,
  title,
  imageUrl,
}) => {
  const handleClick = () => {
    console.log(`Button clicked with ID: ${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center p-2"
    >
      <img src={imageUrl} alt={title} className="w-full h-19 object-contain" />
      <span className="text-sm mt-2">{title}</span>
    </button>
  );
};

export default DashboardButton;
