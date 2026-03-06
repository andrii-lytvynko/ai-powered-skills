# Zendesk Content Design — Full Reference

Comprehensive rules distilled from the five Zendesk Content Design documents. The SKILL.md checklist is the quick-scan version; consult this file for the full detail behind each rule.

---

## 1. Actionable Language

CTAs should be as specific as possible so the user knows exactly what to expect. Use the most appropriate verb consistently.

### Making a selection

- **Select** — when the user must decide among multiple options. Never use "Choose".

### Giving ownership

- **Assign** — when referring to ownership and responsibility.

### Turning on and off

- **Activate** (status: Active) — for things the user creates that operate on their own (triggers, automations, deletion schedules). Follow with a noun: "Activate trigger". Never use "Enable".
- **Deactivate** (status: Inactive) — reverse of Activate. Follow with a noun. Never use "Disable".
- **Turn on** (status: On) — for making a feature or function available. Follow with a noun: "Turn on messaging for your account". If the action is implied (e.g. checking a checkbox), you can omit "Turn on". Never use "Enable".
- **Turn off** (status: Off) — for making a feature or function unavailable. Follow with a noun: "Turn off Agent Workspace". Never use "Disable".

### Moving back and forth

- **Back** — previous step in a multi-step process. Paired with **Next**. Warn user if they will lose changes.
- **Previous** — use instead of "Back" for table pagination.
- **Next** — next step in a multi-step process. Paired with **Back**. Never use "Proceed" or "Continue".

### Postponing action

- **Skip** — allows the user to postpone an action and proceed with their current task. Never use "Remind me later".

### Receiving confirmation

- **Done** — confirms completion of a multi-step process. Never use "OK" (except on mobile where "OK" is acceptable). Never use "Okay".
- **OK** — only when there's nothing more specific to say. Write as "OK", not "Okay". Prefer **Done** or a more specific CTA in most cases.

### Making changes

- **Create** — brand-new thing in the product. When making a copy of something existing, use **Create copy**.
- **Add** — layer additional things onto something already created. The thing must exist first (user must Create before they can Add).
- **Edit** — modify an existing item. Scope is limited to that item; no other actions like Add or Delete.
- **Manage** — control a large area (subscription, team). Unlike Edit, user can perform a variety of actions. Larger scope than Edit.
- **Update** — only for billing and app changes. Everywhere else, use **Edit** or **Save**.

### Removing

- **Clear** — remove a selection. Never use "Deselect".
- **Delete** — permanent removal; the item is gone forever and can't be recovered. Opposite is **Create**.
- **Remove** — reversible removal; the item can be added back later. Opposite is **Add**.
- **Erase** — specifically for remotely wiping all data on a device (factory reset). Always followed by "device": "Erase device". If not a device wipe, use **Delete** or **Remove**.
- **Archive** — unpublish content (e.g. help center article) and move it to an archive. Can later be published again or deleted.

### Committing

- **Save** — commit changes after creating, adding, or editing. For billing/app changes, use **Update** instead.

### Copying

- **Copy {noun}** — copying to clipboard. Specify what: "Copy link".
- **Copy to {destination}** — copying and applying to another object: "Copy to dashboard".
- **Create copy** — creating an additional copy of an existing item. Never use "Duplicate" or "Clone".

### Viewing

- **View {noun}** — navigate to more information in another place. "View newly added custom intents". "View only" = read-only permission. Never use "See".
- **Show / Show more / Show less** — reveal hidden information or toggle a fold. Use "Show" to unhide something the user previously chose to Hide. Follow with a noun: "Show column", "Show password". Never use "See" or "Unhide".

### Hiding

- **Hide {noun}** — conceal information. Follow with a noun: "Hide column", "Hide password".

### Publishing

- **Share** — make things visible internally (e.g. share a dashboard with team members).
- **Publish / Unpublish** — make things visible externally (e.g. publish a help center article).

### Cancelling

- **Cancel** — discard edits and return to entry point. Never use "Discard changes".
- **Leave without saving** — revert to last saved state without reloading the page. Never use "Discard changes".
- **Undo** — revert to the previous state. Never use "Dismiss".

### Learning

- **Find out more** — only in Admin Center's onboarding banner, launching a modal carousel.
- **Learn about {noun}** — link to a Zendesk help center article. Keep the link text short and focused. The entire phrase must be hyperlinked. Never use standalone "Learn more". Never use help center article titles that can't be localized.

### Navigating

- **Go to {destination}** — CTA directing user to another place in the product. Don't include "page": "Go to Agent Workspace", not "Go to the Agent Workspace page".

### Feedback

- **Give feedback** — link to a community page or external place for feedback. Pair with outgoing link icon.
- **Submit feedback** — user submitting feedback internally through a form.

### General CTA rules

- Include **only one action per button**.
- CTAs appear most often in buttons and anchors.

---

## 2. Tone Framework

### Voice vs tone

- **Voice** is consistent — Zendesk's voice attributes are Charming, Humblident, Distilled, and Real.
- **Tone** is variable — it changes based on what's happening in the moment. We dial tones up or down to meet the user where they are.

### Voice attributes

**Charming** — warm, avoids detached tone. Delights with specificity and surprise. Invites people in.

**Humblident** (humble + confident) — aware of context, doesn't presume to know what's on the user's mind. Gains confidence by understanding the audience and purpose.

**Distilled** — clear and concise. Doesn't try to explain too much all at once.

**Real** — no sugar coating. Customer service isn't always pretty. Keeps things real so people trust we're in touch with reality.

### Tone quadrants

**Low-impact + Informational → Distilled**
- Context: labels, tooltips, auto-dismissing alerts. Good to know, not to remember.
- Character: efficient surgeon.
- How: spare, precise, focused. Nuance and charm can get in the way of transactional experiences.

**High-impact + Informational → Humblident**
- Context: warnings, unsaved-changes modals. Something is up, but leave it to the user to decide.
- Character: resolute sherpa, wizened mountain guide.
- How: even, calm, knowledgeable. Empower users to make choices. Never ask "Are you sure?" — informed users know what's right for them.

**High-impact + Instructional → Real**
- Context: failure messages, security breach notifications, destructive actions. Content must assure and guide.
- Character: no-BS best friend.
- How: direct, candid, respectful. Say what needs to be said from a place of empathy. Skip sugar-coated corp-speak. Never make jokes. Sweet spot between Charming and Distilled.

**Low-impact + Instructional → Charming**
- Context: onboarding, empty states. Cool but not mandatory to get work done.
- Character: fastidious host.
- How: refreshing, warm, well-timed. Adds warmth to low-stakes interactions where the user has more time to read and less to do. Don't overdo it — the goal is a smile, not a LMFAO. We're here to serve, not entertain.

### Misuse patterns to flag

- Charming tone in error or destructive modals → should be Real
- Distilled/cold tone in onboarding or empty states → should be Charming
- Humor or jokes in high-impact situations → should be Real
- Patronizing "Are you sure?" in confirmation modals → should be Humblident

---

## 3. Style and Grammar

### Acronyms

- On first use, spell out and include acronym in parentheses: "A service level agreement (SLA) is a contract between you and your customers."
- All-caps for acronyms: JPG, MP3, API, CCs, 100 KB.
- Lowercase for file extensions: .jpg, .mp3.

### Articles (a, an, the)

- Skip in headings and buttons: "Create trigger" not "Create a trigger".

### Bold

- Use bold to refer to UI elements (buttons, statuses, page titles) instead of italics or quotation marks.
- Use bold to differentiate group names from value names instead of colons.
- If bold is technically impossible (text-only / API content), use colons.
- Bold is sometimes used to emphasize headings in certain components.

### Capitalization

- Sentence case for all UI content (headings, buttons, tabs, labels, etc.).
- Capitalize proper nouns, names of teams at Zendesk, UI destinations (Search page, Account page), plan names (Essential plan, Team plan), Zendesk-unique features/products (Zendesk Suite, Web Widget), statuses (Online, Away, Pending, Active), roles, and acronyms.
- Don't capitalize common features available in other software (settings, admin, tickets), file extensions, most feature names (basic sandbox, premium sandbox), channels (email).

### Contractions

- Use common everyday contractions: isn't, hasn't, you're, aren't, doesn't, can't, wouldn't, that's.
- Avoid in formal flows: billing, security settings, admin experience, account recovery.
- Never use informal contractions: ain't, would've, it'll, that'll, who's, they're, she's, he's, you've, we'd, hadn't, there're.

### Emoji

- Do not use in UI copy. Some have double meanings and don't localize.

### Sentence case

- Capitalize only the first word of a phrase plus proper nouns. Not title case.
- Example: "Changes saved" not "Changes Saved".

### Present tense and active voice

- Default to present tense (happening now). Use past tense for completed actions. Use future tense for things that will happen later.
- Never use present perfect ("has been sent") or future perfect ("will have ended").
- Default to active voice. Active voice is easier to understand and more concise.
- Stick to one tense per component.

**Examples:**
| Do this | Not this |
|---------|----------|
| Request more agents (active, present) | All agent seats filled (passive, past) |
| Approve Zendesk subscription request (active, present) | Zendesk subscription request in need of approval (passive, present) |
| Message sent (passive, past — acceptable for completed actions) | Message has been sent (passive, present perfect) |
| Chat ended (passive, past) | Chat has ended (passive, present perfect) |

### Pronouns

- **Gender-neutral**: use they/them/their, never he/his or she/her. Example: "If the end user isn't online, they'll get an email instead."
- **You**: speak directly to the user. Address a single person in a specific context. It's a conversation, not a speech. "You don't have access" not "Access denied".
- **Me/my/mine**: don't put words in the user's mouth. Never assume the user's voice. "Skip" not "Remind me later". "Open account settings" not "Show me".
- **We**: frame experiences around the user, not Zendesk. Only use "we" when: (1) a specific group of real humans at Zendesk is the source ("We want your feedback! Fill out our survey and a member of our UX research team will be in touch."), or (2) trust is paramount in security/destructive situations ("Our security team is working on restoring your account right now."). This is one of the few times "sorry" appears in UI.

---

## 4. Punctuation

### Ampersand &
- Never use in place of "and". Never use "+" instead of "and".

### Angle bracket <>
- Use right-pointing bracket only for breadcrumb navigation: "Go to Channels > Messaging".

### Apostrophe '
- Never use to denote plurals, even for initialisms.

### Comma ,
- Always use the Oxford comma before the final item in a list.
- Don't use commas in buttons.

### Colon :
- Use to introduce a bulleted list.
- Don't split a sentence at the colon (causes translation challenges).
- Use **bold** to convey grouping, not colons. If bold isn't technically possible, then colons are acceptable.

### Ellipsis ...
- Use for loading, saving, and submitting states ("Loading...", "Saving...").
- Garden handles text truncation automatically — don't add manual ellipses.

### Exclamation point !
- Do not use. Too loud for Zendesk's brand tones.

### Hyphens and dashes
- Fewer is better.
- En dash only for ranges or time periods ($9–$25/month). Mac shortcut: Option + Hyphen.
- Never use en or em dashes for thought breaks. Organize thoughts into separate sentences.

### Parentheses ()
- Use sparingly. Never put crucial information in parentheses.
- Use to introduce an acronym on first use: "Use single sign-on (SSO) to complete registration."
- Don't use both singular and plural — pick one.

### Period .
- **Use** after complete sentences in descriptions, hint text, and validation messages.
- **Don't use** in headings, buttons/CTAs, menu labels, or breadcrumbs.
- **Bulleted lists**: generally no period (fragments). If a bullet has multiple sentences, use periods on all items in that list. If it's a single complete sentence, no period.

### Quotation marks ""
- Use only to quote text or show language examples: 'Enter names separated with a space. For example, "Kiersa Cindy Charla".'
- Use for citing user-defined text in strings: 'Approval request sent to Diana Oum: "UserTesting license for Christian De Pape"'.
- Never for UI element references — use **bold** instead.

### Semi-colon ;
- Never use in product content.

### Slash /
- Use for URLs and as "per" ($9/agent per month).
- Maximum one slash per phrase.

---

## 5. Numbers

### General
- Use numerals, not words, in sentences and descriptions. They're easier to read.
- Avoid starting a sentence with a number — restructure instead.
- Example: "You have 3 out of 10 sandboxes remaining" not "You have three out of ten sandboxes remaining".

### Currency
- Follow the i18n library for locale-specific currency formatting.
- Include the three-letter country code and the currency symbol (position varies by locale).

### Decimals and fractions
- Convert fractions to decimals.
- Add a leading zero if less than 1: 0.75, not .75.
- Fractions as words are OK in body copy: "Half of the page will be hidden."
- Never use fraction symbols (½) or notation (1/2, 1/4) in UI.

| Do this | Not this |
|---------|----------|
| 13.5 acres | 13 1/2 acres, 13 ½ acres |
| 0.75 seconds | .75 seconds |
| 0.25 | 1/4 |

### Percentages
- No space between numeral and %: 37%, not 37 %.
- Leading zero for amounts between -1 and 1: 0.99%, not .99%.
- No fraction symbols: 12.5%, not 12 ½%.

### Phone numbers
- E.164 format: plus sign + country code + phone number with area code. No parentheses, spaces, or hyphens.
- For mobile numbers in UK/Australia: drop the trunk prefix (leading zero) when using the country code.

| Do this | Not this |
|---------|----------|
| +14159671337 | (415) 967-1337 |
| +442073119620 | 020 7311 9620 |

### Dates (US English)
- Format: {Mon d, yyyy} or {Month d, yyyy}.
- Three-letter abbreviation or full month name.
- Never pad day with zero.

| Do this | Not this |
|---------|----------|
| Jan 14, 2020 | 14 Jan 2020 |
| March 4, 2020 | March 04, 2020 |

### Time

**12-hour format:**
- Space after the time.
- AM/PM in uppercase, no periods.

| Do this | Not this |
|---------|----------|
| 11:37 PM | 11:37pm |
| 6:55 PM | 06:55 PM |

**24-hour format:**
- Leading zero for single-digit hours.
- No AM/PM.

| Do this | Not this |
|---------|----------|
| 09:44 | 9:44 |
| 23:11 | 23:11 PM |

### All day
- "All day" means 12:00 AM to 11:59 PM.

### Relative time

| Event | Format | Example |
|-------|--------|---------|
| Less than 1 minute ago | < 1 minute ago | < 1 minute ago |
| 1–59 minutes ago | {n} minutes ago | 43 minutes ago |
| 1+ hours ago (same day) | Today at {time} or {n} hours ago | Today at 6:55 PM / Last saved 2 hours ago |
| Yesterday | Yesterday at {time} | Yesterday at 09:44 |
| Before yesterday, current year | {Mon d} at {time} | Jan 5 at 11:37 PM |
| Before current year | {Mon d, yyyy} at {time} | Sep 16, 2017 at 23:11 |

Avoid vague words: "now", "soon", "later", "in a while". The format used depends on the job to be done (audit log needs second-level detail; live channels need elapsed time).

### Timezones
- UTC format with +/- offset using four digits and leading zeroes.
- Space before the + or -.
- No parentheses. No letter codes.

| Do this | Not this |
|---------|----------|
| 11:37 UTC -02:30 | 11:37pm NST |
| 9:44 PM +10:00 | 9:44 PM PGT |
