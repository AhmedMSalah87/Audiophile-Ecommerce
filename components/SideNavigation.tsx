"use client";
import { useState } from "react";
import { signOut } from "next-auth/react"; // i use that way as client coponent
import OrderCard from "./OrderCard";
import { Session } from "next-auth";

const SideNavigation = ({ session }: { session: Session | null }) => {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <h4>Hello, {session?.user.name} </h4>;
      case "orders":
        return (
          <main>
            <h3>Your Orders</h3>
            <OrderCard />
          </main>
        );
      case "profile":
        return <div>Your Profile Settings</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary h-screen grid grid-cols-[1fr_3fr]">
      {/* Sidebar */}
      <div className="flex flex-col">
        <button onClick={() => setActiveTab("account")}>Account</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button
          style={{ marginTop: "auto" }}
          onClick={() => signOut({ callbackUrl: "/" })} // only works in using next client
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default SideNavigation;
