// Located in /components/Dashboard.tsx
import React from "react";
import DashboardButton from "./DashboardButton.component";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const buttons = Array.from({ length: 54 }).map((_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    imageUrl: `/onchain-loteria/${index + 1}.png`, // Correct path to match your files
  }));

  return (
    <div className="grid grid-cols-6 gap-4">
      {buttons.map((button) => (
        <DashboardButton
          key={button.id}
          id={button.id}
          title={button.title}
          imageUrl={button.imageUrl}
        />
      ))}
    </div>
  );
};

export default Dashboard;
