"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function Nav() {
  const path = usePathname();
  const router = useRouter();

  async function signOut() {
    await supabaseBrowser().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="nav">
      <Link href="/" className={path === "/" ? "on" : ""}>
        Evaluate
      </Link>
      <Link href="/documents" className={path.startsWith("/documents") ? "on" : ""}>
        Documents
      </Link>
      <button onClick={() => void signOut()}>Sign out</button>
    </nav>
  );
}
