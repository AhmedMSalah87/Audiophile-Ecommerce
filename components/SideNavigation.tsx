"use client";
import { useState } from "react";
import { signOut } from "next-auth/react"; // i use that way as client coponent
import OrderCard, { OrderProps } from "./OrderCard";
import { Session } from "next-auth";
import {
  CalendarArrowDown,
  CircleUserRound,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SideNavigation = ({
  session,
  orders,
}: {
  session: Session | null;
  orders: OrderProps[] | null;
}) => {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <h4>Hello, {session?.user.name} </h4>;
      case "orders":
        return (
          <main>
            <OrderCard orders={orders} />
          </main>
        );
      case "settings":
        return <h4>Your Profile Settings</h4>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-secondary py-6">
      <h2 className="contain mx-auto mb-8">My Account</h2>
      <div className="grid grid-cols-[1fr_3fr] gap-12 h-screen contain mx-auto">
        {/* Sidebar */}
        <div className="flex flex-col gap-4 items-start">
          <button
            className={cn(
              activeTab === "account" ? "bg-primary text-white" : "",
              "cursor-pointer flex items-center gap-2 w-full py-3 px-1.5 rounded-md"
            )}
            onClick={() => setActiveTab("account")}
          >
            <CircleUserRound />
            Account
          </button>
          <button
            className={cn(
              activeTab === "orders" ? "bg-primary text-white" : "",
              "cursor-pointer flex items-center gap-2 w-full py-3 px-1.5 rounded-md"
            )}
            onClick={() => setActiveTab("orders")}
          >
            <CalendarArrowDown />
            Orders
          </button>
          <button
            className={cn(
              activeTab === "settings" ? "bg-primary text-white" : "",
              "cursor-pointer flex items-center gap-2 w-full py-3 px-1.5 rounded-md"
            )}
            onClick={() => setActiveTab("settings")}
          >
            <Settings />
            Settings
          </button>
          <button
            className="mt-auto cursor-pointer flex items-center gap-2 hover:text-primary"
            onClick={() => signOut({ callbackUrl: "/" })} // only works in using next client
          >
            <LogOut />
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white overflow-y-scroll">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SideNavigation;
