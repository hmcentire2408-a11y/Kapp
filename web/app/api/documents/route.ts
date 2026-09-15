import { NextRequest } from "next/server";
import { requireUser, supabaseServer } from "@/lib/supabase/server";
import { CLASSIFICATIONS } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("documents")
    .select("id, title, classification, body, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ documents: data ?? [] });
}

export async function POST(req: NextRequest) {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const title = String(body?.title ?? "").trim();
  const classification = String(body?.classification ?? "");
  const text = String(body?.body ?? "").trim();

  if (!title) return Response.json({ error: "Title is required." }, { status: 400 });
  if (!text) return Response.json({ error: "Document body is empty." }, { status: 400 });
  if (!(CLASSIFICATIONS as string[]).includes(classification)) {
    return Response.json(
      { error: `classification must be one of: ${CLASSIFICATIONS.join(", ")}` },
      { status: 400 },
    );
  }

  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("documents")
    .insert({ user_id: user.id, title, classification, body: text })
    .select("id, title, classification, updated_at")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ document: data });
}

export async function DELETE(req: NextRequest) {
  const user = await requireUser();
  if (!user) return Response.json({ error: "Not signed in." }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id is required." }, { status: 400 });

  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
