import PromptForm from '@/components/PromptForm';
import { notFound } from 'next/navigation';
import { connectionDB } from '@/lib/db';
import Prompt from '@/models/prompt';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Edit({
  params,
}: Props) {
  const { id } = await params;
  await connectionDB();
  const prompt = await Prompt.findById(id).lean();

  if (!prompt) notFound();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
      <PromptForm
        mode="Edit"
        promptId={id}
        initialPrompt={{
          title: prompt.title,
          description: prompt.description,
          promptText: prompt.promptText,
          category: prompt.category,
          tags: prompt.tags ?? [],
          author: prompt.author,
        }}
      />
    </main>
  );
}
