"use client";

import { CreateForm } from "./components/create-form";

export default function CreateCommunity() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Create a New Community
      </h1>
      <CreateForm />
    </div>
  );
}
