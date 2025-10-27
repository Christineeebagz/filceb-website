import UsersView from "@/components/admin/UsersView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
        <Button asChild>
          <Link href="/admin/users/new">Button Here</Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
        <UsersView />
      </div>
    </section>
  );
};

export default page;
