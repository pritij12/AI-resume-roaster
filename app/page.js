'use client';

import { useState } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

// SessionProvider lets us know who is logged in
export default function Page() {
  return (
    <SessionProvider>
      <RoastApp />
    </SessionProvider>
  );
}

function RoastApp() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function roast(e) {
    e.preventDefault();
    if (!file) return setError('Choose your resume PDF first.');
    setLoading(true);
    setError('');
    setResult(null);

    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/roast', { method: 'POST', body: form });
    const data = await res.json();

    if (res.ok) setResult(data);
    else setError(data.error || 'Something went wrong.');
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-extrabold">🔥 AI Resume Roaster</h1>

      {status === 'loading' && <p>Loading...</p>}

      {status === 'unauthenticated' && (
        <div className="rounded-xl border bg-white p-6 text-center">
          <p className="mb-4">Sign in to roast your resume.</p>
          <button
            onClick={() => signIn('github')}
            className="rounded-lg bg-gray-900 px-5 py-2 font-semibold text-white"
          >
            Sign in with GitHub
          </button>
        </div>
      )}

      {status === 'authenticated' && (
        <>
          <p className="mb-4 text-sm">
            Hi {session.user.name}!{' '}
            <button onClick={() => signOut()} className="underline">
              Sign out
            </button>
          </p>

          <form onSubmit={roast} className="rounded-xl border bg-white p-5">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="mb-4 block w-full text-sm"
            />
            <button
              disabled={loading}
              className="rounded-lg bg-orange-600 px-5 py-2 font-semibold text-white disabled:opacity-50"
            >
              {loading ? 'Roasting...' : 'Roast my resume'}
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </form>

          {result && (
            <div className="mt-6 rounded-xl border bg-white p-5">
              <p className="text-5xl font-extrabold text-orange-600">{result.score}/100</p>
              <p className="mt-3 italic">{result.roast}</p>
              <h2 className="mt-4 font-bold">Tips to improve</h2>
              <ul className="ml-5 list-disc text-sm">
                {result.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </main>
  );
}
