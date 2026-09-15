import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function env() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in web/.env.local.",
    );
  }
  return { url, key };
}

export async function supabaseServer() {
  const store = await cookies();
  const { url, key } = env();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component — middleware refreshes the session.
        }
      },
    },
  });
}

/**
 * The authenticated user, verified against the auth server.
 *
 * Every route that touches student data calls this and uses the returned id.
 * Never trust a user id supplied by the client: getUser() revalidates the JWT,
 * getSession() does not.
 */
export async function requireUser() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/** Display name for the prompt's {{STUDENT_NAME}}. Falls back to the email local part. */
export async function displayNameFor(userId: string): Promise<string> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userId)
    .single();
  return data?.display_name?.trim() || "the student";
}
