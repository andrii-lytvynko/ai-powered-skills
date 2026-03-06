---
name: content-review
description: Audits UI copy in ZenBox page components against Zendesk Content Design guidelines and produces a prioritized list of fixes. Use when the user says "review copy", "content review", "check the text", "does this sound like Zendesk", "audit the copy", or wants to improve the language on a page.
---

# Content Review

Reads every visible string in the target component(s) and checks it against Zendesk's Content Design standards (tone, grammar, punctuation, numbers, actionable language). Outputs a structured report with concrete rewrites.

## Step 0: Identify scope

Ask the user which page or component to review — or infer it from the currently open file. Then read **all** JSX/TSX files in that component tree. Collect every user-visible string: headings, body text, button labels, menu items, tooltips, placeholders, empty-state messages, error/success messages, breadcrumbs, and tab labels.

## Step 1: Audit against checklist

Run every collected string through the checklist below. For each violation, note the **file**, **line**, the **current copy**, the **rule violated**, and a **suggested rewrite**.

For detailed rules and examples beyond this checklist, read [reference.md](reference.md).

---

### A. Actionable language (CTA verbs)

Use the correct Zendesk verb for every call to action:

| Action | Use | Never use |
|--------|-----|-----------|
| Pick from options | Select | Choose |
| Give ownership | Assign | — |
| Make something auto-run | Activate / Deactivate | Enable / Disable |
| Feature availability | Turn on / Turn off | Enable / Disable |
| Go back in multi-step | Back | — |
| Table pagination | Previous / Next | Back / Proceed / Continue |
| Skip an optional step | Skip | Remind me later |
| Confirm multi-step done | Done | OK (except mobile) |
| Brand-new thing | Create | — |
| Layer onto existing thing | Add | — |
| Change existing item | Edit | — |
| Control large area | Manage | — |
| Billing/app changes | Update | — |
| Remove selection | Clear | Deselect |
| Permanent removal | Delete | Remove (if permanent) |
| Reversible removal | Remove | Delete (if reversible) |
| Wipe device data | Erase | Remove / Delete / Wipe / Factory reset |
| Unpublish to archive | Archive | Remove / Delete |
| Commit changes | Save | — |
| Copy to clipboard | Copy {noun} | — |
| Duplicate existing item | Create copy | Duplicate / Clone |
| Navigate to more info | View {noun} | See |
| Reveal hidden info | Show / Show more | See / Unhide |
| Conceal info | Hide | — |
| Internal visibility | Share | — |
| External visibility | Publish / Unpublish | — |
| Discard edits | Cancel | Discard changes |
| Revert to last saved | Leave without saving | Discard changes |
| Undo last action | Undo | Dismiss |
| Link to help article | Learn about {noun} | Learn more |
| Navigate in-product | Go to {destination} | Go to the {destination} page |
| Link to feedback form | Give feedback / Submit feedback | — |

Buttons must contain **one action only**.

### B. Tone framework

Map every piece of copy to a quadrant and verify the tone matches:

| Quadrant | When | Tone | Character |
|----------|------|------|-----------|
| Low-impact + informational | Labels, tooltips, auto-dismiss alerts | **Distilled** — spare, precise, focused | Efficient surgeon |
| High-impact + informational | Warnings, unsaved-changes modals | **Humblident** — even, calm, knowledgeable | Resolute sherpa |
| High-impact + instructional | Failures, security breaches, destructive actions | **Real** — direct, candid, respectful | No-BS best friend |
| Low-impact + instructional | Onboarding, empty states, optional setup | **Charming** — refreshing, warm, well-timed | Fastidious host |

Common violations:
- Charming tone in error messages or destructive modals (should be Real)
- Distilled/cold tone in onboarding or empty states (should be Charming)
- Jokes or humor in high-impact situations

### C. Style and grammar

- **Sentence case** everywhere — headings, buttons, tabs, menu labels. Never title case.
- **Present tense + active voice** by default. Past tense only for completed actions ("Message sent"). Never use present perfect ("has been sent") or future perfect ("will have ended").
- **One tense per component** — don't mix tenses in the same UI area.
- **Address the user as "you"** — never "me", "my", "mine", "us".
- **Avoid "we"** unless referring to a specific team at Zendesk for trust (security breach, feedback request).
- **Gender-neutral pronouns** — they/them/their, never he/his or she/her.
- **Contractions** — use common ones (isn't, can't, you're, doesn't) in casual flows. Avoid in billing, security settings, admin, account recovery. Never use informal contractions (ain't, would've, it'll, that'll).
- **No emoji** in UI copy.
- **Bold** for UI element references (button names, page titles). Never use quotation marks or italics for UI references.
- **Acronyms** — spell out on first use with the acronym in parentheses. All-caps for acronyms (SLA, API). Lowercase for file extensions (.jpg, .mp3).
- **Articles** (a, an, the) — skip in headings and buttons to stay concise.

### D. Punctuation

- **No ampersands** — write "and". No "+" for "and".
- **No exclamation points** in UI copy.
- **No semi-colons** in product content.
- **Oxford comma** — always use it in lists.
- **Periods** — use after complete sentences in descriptions, hints, and validation messages. No periods in headings, buttons, menu labels, or breadcrumbs. For bulleted lists: no period for single fragments; periods on all items if any bullet has multiple sentences.
- **Ellipsis** — only for loading/saving/submitting states ("Loading..."). Garden handles text truncation automatically.
- **Parentheses** — use sparingly. Never put crucial info in parentheses. Use to introduce an acronym on first use.
- **Colons** — use to introduce bulleted lists. Use **bold** (not colons) for group:value pairs. Never split a sentence at the colon.
- **Angle brackets** — only for breadcrumb navigation ("Channels > Messaging").
- **Quotation marks** — only for quoting text or showing language examples. Never for UI element references.
- **Slash** — for URLs and "per" ($9/agent per month). Max one slash per phrase.

### E. Numbers and formatting

- **Numerals** not words in sentences. Restructure to avoid starting a sentence with a number.
- **Decimals** not fractions; add leading zero if < 1 (0.75, not .75 or 3/4).
- **Percentages** — no space before % ; leading zero for values between -1 and 1 (0.99%).
- **Phone numbers** — E.164 format: +{country code}{number}, no parentheses/spaces/hyphens (+14159671337).
- **Dates** (US English) — {Mon d, yyyy} or {Month d, yyyy}. Never pad day with zero (March 4, not March 04).
- **Time (12h)** — space after time, AM/PM uppercase, no periods (11:37 PM).
- **Time (24h)** — leading zero for single-digit hours, no AM/PM (09:44).
- **Relative time** — follow the standard scale: "< 1 minute ago" → "{n} minutes ago" → "Today at {time}" or "{n} hours ago" → "Yesterday at {time}" → "{Mon d} at {time}" → "{Mon d, yyyy} at {time}".
- **Timezones** — UTC format with +/- offset (11:37 UTC -02:30). No letter codes (not "NST").

---

## Step 2: Classify findings

Group every finding into one of three severity levels:

### Must fix
Hard rule violations:
- Wrong CTA verb
- Title case instead of sentence case
- Ampersand, exclamation point, or semi-colon in copy
- Gendered pronoun (he/she)
- "me", "my", "mine" speaking as the user
- Period in a heading, button, or menu label
- Informal contraction (ain't, it'll)
- Emoji in UI copy

### Should fix
- Tone mismatch for the quadrant (charming error message, cold empty state)
- Passive voice or present-perfect tense where active present works
- Missing contraction in a casual flow (or unnecessary contraction in billing/security)
- "we" used without referring to a specific Zendesk team
- Quotation marks around a UI element reference instead of bold
- Acronym not spelled out on first use
- Fraction instead of decimal

### Consider
- Copy could be more concise (unnecessary words)
- Missing Oxford comma
- Period inconsistency in a bulleted list
- Number written as a word instead of numeral
- Opportunity to improve relative-time formatting
- Timezone shown with letter codes instead of UTC offset

---

## Step 3: Produce report

Output a markdown report with this structure:

```
## Content review: {Component/Page name}

### Must fix

| # | File | Line | Current copy | Rule | Suggested rewrite |
|---|------|------|-------------|------|-------------------|
| 1 | ... | ... | ... | ... | ... |

### Should fix

| # | File | Line | Current copy | Rule | Suggested rewrite |
|---|------|------|-------------|------|-------------------|
| 1 | ... | ... | ... | ... | ... |

### Consider

| # | File | Line | Current copy | Rule | Suggested rewrite |
|---|------|------|-------------|------|-------------------|
| 1 | ... | ... | ... | ... | ... |

### Summary
- {n} must fix, {n} should fix, {n} consider
- Top issues: {brief summary of most common patterns}
```

After presenting the report, ask the user if they want you to apply the fixes automatically.

---

## Step 4: Apply fixes (if requested)

When the user confirms, use StrReplace to apply each rewrite. Work through **Must fix** first, then **Should fix**. Skip **Consider** items unless the user explicitly asks.

After applying, re-read the changed files and do a quick second pass to make sure no new issues were introduced.
