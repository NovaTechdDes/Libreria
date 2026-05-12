import { AsideBar } from "@/src/components/admin/AsideBar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-white">
      <AsideBar />

      <main className="flex-1 overflow-y-auto bg-slate-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
