import { Suspense } from "react";
import DashboardPage from "@/views/DashboardPage";

export const metadata = {
  title: "Account Dashboard & Orders — ShopHub",
  description: "Track your orders, view account profile, and manage seller store operations on ShopHub.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0B0F19]">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-purple-600 border-t-transparent" />
        </div>
      }
    >
      <DashboardPage />
    </Suspense>
  );
}
