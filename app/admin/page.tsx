// app/admin/users/page.tsx
import UsersView from "@/components/admin/UsersView";
import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>
      <div className="mt-7 w-full overflow-x-auto">
        <div className="min-w-250 lg:min-w-full">
          <UsersView />
        </div>
      </div>
    </section>
  );
};

export default page;
