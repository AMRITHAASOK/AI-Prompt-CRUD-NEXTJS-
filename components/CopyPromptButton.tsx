'use client';

import { useState } from 'react';

export default function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
      setCopied(false);
    }
  }

  return (
    <div className="mt-5 flex items-center gap-3">
      <button
        type="button"
        onClick={copyPrompt}
        className="inline-flex h-10 w-28 items-center justify-center rounded-full border border-blue-950 bg-blue-950 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
      >
        {copied ? 'Copied!' : 'Copy prompt'}
      </button>
      {failed && <span role="status" className="text-sm text-red-700">Could not copy. Please select and copy the prompt text.</span>}
      {copied && <span role="status" className="text-sm text-green-700">Prompt copied to clipboard.</span>}
    </div>
  );
}
