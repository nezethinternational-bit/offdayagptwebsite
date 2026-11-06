'use client';
import { useState } from 'react';
import { pages, type PagePath, type PageContent } from '../lib/site-pages';

type Entry = { path: PagePath; content: PageContent };

export default function PageEditor({ entries }: { entries: Entry[] }) {
  const [path, setPath] = useState<PagePath>('/');
  const [drafts, setDrafts] = useState(Object.fromEntries(entries.map(entry => [entry.path, entry.content])) as Record<PagePath, PageContent>);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const content = drafts[path];

  function update(field: keyof PageContent, value: string) {
    setDrafts(previous => ({ ...previous, [path]: { ...previous[path], [field]: value } }));
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Page could not be saved.');
      setMessage('Saved. Your changes are live.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Page could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  return <main className="wrap section">
    <a href="/admin" className="text-link">← Back to Content Studio</a>
    <h1>Website pages and SEO</h1>
    <p>Choose a page to edit its headline, introduction, extra copy and search appearance.</p>
    <form className="enquiry-form" onSubmit={save}>
      <fieldset disabled={saving} className="page-editor-fields">
        <label>Page<select value={path} onChange={event => { setPath(event.target.value as PagePath); setMessage(''); }}>
          {entries.map(entry => <option key={entry.path} value={entry.path}>{pages[entry.path][0]}</option>)}
        </select></label>
        <label>Search title<input required minLength={5} maxLength={120} value={content.title} onChange={event => update('title', event.target.value)} /></label>
        <label>Meta description<textarea required minLength={10} maxLength={300} rows={3} value={content.description} onChange={event => update('description', event.target.value)} /></label>
        <label>Page headline<input maxLength={150} value={content.heading} onChange={event => update('heading', event.target.value)} placeholder="Leave blank for the original headline" /></label>
        <label>Introduction<textarea maxLength={1000} rows={3} value={content.introduction} onChange={event => update('introduction', event.target.value)} /></label>
        <label>Extra page copy<textarea maxLength={10000} rows={6} value={content.body} onChange={event => update('body', event.target.value)} /></label>
        <div className="section-heading">
          <button className="button">{saving ? 'Saving…' : 'Save and publish'}</button>
          <a href={path} target="_blank" rel="noreferrer">View page ↗</a>
        </div>
      </fieldset>
      <p role="status">{message}</p>
    </form>
  </main>;
}
