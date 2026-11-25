import PromptForm from "@/components/PromptForm";

export default function Add() {
  return (
     <main className="mx-auto min-h-[calc(100vh-10rem)] w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
      <PromptForm mode="Create" />
    </main>
  );
}
