# Kapp — web app

Next.js 15 (App Router) + Supabase. Three students sign in separately; each
session assembles exactly one student's file.

## How isolation works

`CLAUDE.md` §2 and `prompts/master-prompt.md` §7 require that one request never
carries two students' documents. That is enforced in three places, so a bug in
any one of them is not sufficient to leak:

1. **Row-level security.** Every table in `supabase/schema.sql` has RLS on and a
   single policy: `auth.uid() = user_id`. The database refuses another user's
   rows even if the server asks for them.
2. **Verified identity.** `requireUser()` calls `supabase.auth.getUser()`, which
   revalidates the JWT against the auth server. The user id never comes from the
   request body. (`getSession()` would not revalidate — do not substitute it.)
3. **Single-student assembly.** `loadContext(userId, …)` takes one user id and
   has no code path that loads a second.

The anon key is safe to expose in the browser. It grants nothing on its own —
RLS is what protects the data.

## Setup

1. **Create the Supabase project** (free tier is enough for three users).
2. **Run the schema.** SQL Editor → paste `supabase/schema.sql` → Run.
3. **Create the three accounts.** Authentication → Users → Add user, with
   "Auto Confirm User" checked. There is no public sign-up by design.
4. **Configure the app:**
   ```bash
   cp .env.local.example .env.local
   # fill in ANTHROPIC_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
5. **Run it:**
   ```bash
   npm install
   npm run dev     # http://localhost:3000
   ```

## What gets sent to the model

Request order follows `prompts/master-prompt.md` §6:

```
system   = master-prompt.md, {{TODAY}} and {{STUDENT_NAME}} filled   [cached 1h]
messages = LIBRARY docs -> MORGANTON docs -> SCHOOL FIT              [cached 1h]
           -> this student's documents                              [cached 1h]
           -> context-gap notes -> the conversation                  (volatile)
```

Three cache breakpoints of the four allowed. The static corpus is byte-identical
across users, so all three share one cache entry. Watch
`cache_read_input_tokens` in the per-turn usage line under each answer — if it
stays at zero, something volatile has crept into the prefix.

Every document block sets `citations: {enabled: true}`, so answers carry
`cited_text` back to the source passage. Citations are all-or-none per request.

## Model configuration

| Setting | Value | Why |
|---|---|---|
| `model` | `claude-opus-5` | Per `CLAUDE.md` §2. Override with `KAPP_MODEL`. |
| `thinking` | `adaptive`, `display: summarized` | Reasoning is shown collapsed under each answer. |
| `output_config.effort` | `high` | Override with `KAPP_EFFORT`. `max` costs more; `medium` is the cheap step-down. |
| `max_tokens` | 64000, streamed | Streaming is required at this size. |
| `fallbacks` | `"default"` | If a safety classifier declines, the server routes by refusal category instead of returning an unusable turn. |
| `web_search` | `web_search_20260209`, `max_uses: 5` | Deprioritized by decision — policy facts only. Disable with `KAPP_WEB_SEARCH=off`. |

## Corpus dependency

`corpus/library/` and `corpus/morganton/` do not exist yet — `TASKS.md` B1/B2
are still `todo`. The app runs without them, shows the gap in the left panel,
and tells the model in-band what it is missing so it says so rather than
answering from memory. Fit claims degrade the same way if
`data/school-fit/school-fit.md` is absent.

## Deploying

Set the same environment variables in the host's dashboard. `ANTHROPIC_API_KEY`
must **not** carry a `NEXT_PUBLIC_` prefix — that would ship it to the browser.
Add the deployed origin to Supabase → Authentication → URL Configuration →
Redirect URLs.
