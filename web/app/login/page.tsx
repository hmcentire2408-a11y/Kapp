"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(params.get("next") || "/");
    router.refresh();
  }

  return (
    <div className="auth">
      <div className="card">
        <h1>Kapp</h1>
        <p className="tag-line">
          Private admissions evaluation. Your file is visible only to you.
        </p>

        {!configured && (
          <div className="note err">
            Supabase is not configured. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>web/.env.local</code>,
            then run <code>supabase/schema.sql</code> in the SQL editor.
          </div>
        )}

        <form onSubmit={signIn}>
          <label>
            Email
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="note err">{error}</div>}
          <button className="send" type="submit" disabled={busy || !configured}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="fine">
          Accounts are created by the administrator in the Supabase dashboard.
          There is no public sign-up.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth" />}>
      <LoginForm />
    </Suspense>
  );
}
