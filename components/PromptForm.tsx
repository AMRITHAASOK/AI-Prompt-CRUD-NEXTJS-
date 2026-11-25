'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Type for Prompt Data
interface Prompt {
  title: string;
  description: string;
  promptText: string;
  category: string;
  tags: string[];
  author: string;
}

// Props received from Add/Edit pages
interface PromptFormProps {
  mode?: 'Create' | 'Edit';
  promptId?: string;
  initialPrompt?: Prompt;
}

// Dropdown categories
const categories = [
  'ChatGPT',
  'Midjourney',
  'Claude',
  'Gemini',
  'Copilot',
  'Other',
];

export default function PromptForm({
  mode = 'Create',
  promptId,
  initialPrompt,
}: PromptFormProps) {
  const router = useRouter();

  // State Creation
  const [formData, setFormData] = useState<Prompt>({
    title: initialPrompt?.title || '',
    description: initialPrompt?.description || '',
    promptText: initialPrompt?.promptText || '',
    category: initialPrompt?.category || 'ChatGPT',
    tags: initialPrompt?.tags || [],
    author: initialPrompt?.author || '',
  });

  const [loading, setLoading] = useState(false);

  // Form Submit Logic
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    // API URL
    const url =
      mode === 'Create'
        ? '/api/prompts'
        : `/api/prompts/${promptId}`;

    // HTTP Method
    const method = mode === 'Create' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not save the prompt');

      router.push('/prompts');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl rounded-[2rem] border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5 sm:p-8 md:p-12">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
          {mode === 'Create'
            ? 'ADD NEW PROMPT'
            : 'EDIT PROMPT'}
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {mode === 'Create'
            ? 'Create Prompt'
            : 'Edit Prompt'}
        </h1>

        <p className="text-slate-600 leading-relaxed">
          Build a reusable AI prompt and tag it with a
          category so it can be easily searched later.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              placeholder="Prompt title"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            placeholder="Short summary of the prompt"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Prompt Text */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Prompt Text
          </label>
          <textarea
            required
            rows={8}
            value={formData.promptText}
            onChange={(e) =>
              setFormData({
                ...formData,
                promptText: e.target.value,
              })
            }
            placeholder="Write the prompt here"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Tags + Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                })
              }
              placeholder="react, nextjs, ai"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Author
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: e.target.value,
                })
              }
              placeholder="Author name"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 min-w-40 items-center justify-center rounded-full bg-blue-950 px-6 font-semibold text-white shadow-md shadow-blue-950/15 transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60"
        >
          {loading
            ? 'Saving...'
            : mode === 'Create'
            ? 'Create Prompt'
            : 'Update Prompt'}
        </button>
      </form>
    </section>
  );
}
