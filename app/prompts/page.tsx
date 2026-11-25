"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = ["ChatGPT", "Midjourney", "Claude", "Gemini", "Copilot", "Other"];
const cardButtonClass = "inline-flex h-10 w-28 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60";

export default function Prompts() {

    const [prompts,setPrompts]=useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionError, setActionError] = useState("")
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [savingId, setSavingId] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")

    const visiblePrompts = prompts.filter((prompt) => {
        const matchesCategory = !category || prompt.category?.toLowerCase() === category.toLowerCase()
        const searchText = `${prompt.title ?? ""} ${prompt.description ?? ""} ${prompt.promptText ?? ""} ${(prompt.tags ?? []).join(" ")}`.toLowerCase()
        return matchesCategory && searchText.includes(search.trim().toLowerCase())
    })

    async function deletePrompt(id: string) {
        if (!window.confirm("Delete this prompt?")) return

        setDeletingId(id)
        setActionError("")
        try {
            const response = await fetch(`/api/prompts/${id}`, { method: "DELETE" })
            if (!response.ok) throw new Error("Delete request failed")
            setPrompts((current) => current.filter((prompt) => prompt._id !== id))
        } catch {
            setActionError("Could not delete this prompt. Please try again.")
        } finally {
            setDeletingId(null)
        }
    }

    async function copyPrompt(id: string, text: string) {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedId(id)
            window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1800)
        } catch {
            setActionError("Could not copy this prompt. Please open it and copy the text manually.")
        }
    }

    async function toggleSaved(id: string) {
        const currentPrompt = prompts.find((prompt) => prompt._id === id)
        if (!currentPrompt) return

        setSavingId(id)
        setActionError("")
        try {
            const response = await fetch(`/api/prompts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorite: !currentPrompt.favorite }),
            })
            if (!response.ok) throw new Error("Save request failed")
            const data = await response.json()
            setPrompts((current) => current.map((prompt) => prompt._id === id ? data.prompt : prompt))
        } catch {
            setActionError("Could not update the saved prompt. Please try again.")
        } finally {
            setSavingId(null)
        }
    }
    
    useEffect(()=>{
        fetch("/api/prompts")
            .then((res) => {
                if (!res.ok) throw new Error("Could not load prompts.")
                return res.json()
            })
            .then((data) => setPrompts(Array.isArray(data.allPrompts) ? data.allPrompts : []))
            .catch(() => setError("Prompts could not be loaded. Please try again."))
            .finally(() => setLoading(false))
    },[])

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
      <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-white to-blue-100 px-6 py-9 shadow-lg shadow-blue-950/5 sm:px-10 md:flex md:items-center md:justify-between md:px-14 md:py-12">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Prompt library</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Find your next great prompt.</h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">Explore reusable prompts for ChatGPT, Midjourney, Claude, and more.</p>
        </div>
        <Link href="/prompts/add" className="relative mt-6 inline-flex h-12 items-center justify-center rounded-full bg-blue-950 px-6 font-semibold text-white shadow-md shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-800 md:mt-0">+ Add prompt</Link>
      </section>

      <section aria-label="Prompt filters" className="mb-8 rounded-3xl border border-blue-100 bg-white/80 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:flex-1" placeholder="Search prompts, tags, or keywords" aria-label="Search prompts" />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:w-64 sm:shrink-0" aria-label="Filter by category">
            <option value="">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["", ...categories].map((item) => {
            const selected = category === item;
            return <button key={item || "all"} type="button" onClick={() => setCategory(item)} aria-pressed={selected} className={`inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${selected ? "border-blue-950 bg-blue-950 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-950"}`}>{item || "All"}</button>;
          })}
        </div>
      </section>

      {actionError && <p role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{actionError}</p>}

      {loading ? <p className="py-16 text-center text-slate-500">Loading prompts...</p> : error ? <p role="alert" className="rounded-2xl bg-red-50 px-5 py-8 text-center text-red-700">{error}</p> : visiblePrompts.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center text-slate-500">{prompts.length === 0 ? "No prompts yet. Add the first one to get started." : "No prompts match your search."}</div> : (
        <section aria-label="Prompts" className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visiblePrompts.map((item: any) => (
            <article key={item._id} className="group flex min-h-[27rem] flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-md shadow-blue-950/5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">
              <div className="h-1.5 bg-gradient-to-r from-blue-950 via-blue-600 to-sky-400" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 min-w-28 items-center justify-center rounded-full bg-blue-50 px-4 text-sm font-semibold text-blue-900 ring-1 ring-inset ring-blue-100">{item.category}</span>
                  <button type="button" onClick={() => copyPrompt(item._id, item.promptText ?? "")} className={`${cardButtonClass} border-blue-200 bg-white text-blue-950 hover:bg-blue-50`}>{copiedId === item._id ? "Copied!" : "Copy"}</button>
                </div>

                <h2 className="mt-5 line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-slate-950">{item.title || item.description}</h2>
                <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-relaxed text-slate-600">{item.title ? item.description : "Reusable AI prompt"}</p>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
                  <p className="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">{item.promptText}</p>
                </div>

                <div className="mt-4 flex min-h-7 flex-wrap gap-2">
                  {(item.tags ?? []).slice(0, 4).map((tag: string, index: number) => <span key={`${tag}-${index}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">#{tag}</span>)}
                </div>

                <div className="mt-auto pt-5">
                  <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{item.author}</span>
                    <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <button type="button" onClick={() => toggleSaved(item._id)} disabled={savingId === item._id} aria-pressed={Boolean(item.favorite)} className={`${cardButtonClass} ${item.favorite ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>{savingId === item._id ? "Saving..." : item.favorite ? "Saved ✓" : "Save"}</button>
                    <Link href={`/prompts/${item._id}`} className={`${cardButtonClass} border-blue-950 bg-blue-950 text-white hover:border-blue-800 hover:bg-blue-800`}>View</Link>
                    <Link href={`/prompts/edit/${item._id}`} className={`${cardButtonClass} border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100`}>Edit</Link>
                    <button type="button" onClick={() => deletePrompt(item._id)} disabled={deletingId === item._id} className={`${cardButtonClass} border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100`}>{deletingId === item._id ? "Deleting..." : "Delete"}</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
