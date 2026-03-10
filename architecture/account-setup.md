# Account Setup Guide — Do This Before Any Build Work

## Priority Order (each blocks the next)

---

## 1. Anthropic API Key (CRITICAL — blocks Step 4)

**Important:** A Claude Pro subscription (claude.ai) is NOT the same as an API key.
They are separate products with separate billing.

1. Go to console.anthropic.com
2. Create an account (or log in)
3. Navigate to API Keys → Create new key
4. Copy the key — starts with `sk-ant-...`
5. Store it securely — you will paste it into n8n HTTP Request headers

**Cost for this demo:** Negligible. Three API calls with ~2-3K tokens each = well under $0.10 total.

---

## 2. Airtable (free tier — enough for demo)

1. Go to airtable.com → Create free account
2. Create a new workspace: "Fathom Trace"
3. Create the base (5 tables per data-schema.md)
4. Get your API credentials:
   - Personal access token: airtable.com/create/tokens
   - Scopes needed: `data.records:read`, `data.records:write`
   - Base ID: found in the URL when viewing your base (`appXXXXXX...`)

**Free tier limits:** 1,000 records per base, 5 bases. This is more than enough.

---

## 3. n8n Cloud (free trial — 14 days)

1. Go to app.n8n.cloud
2. Create account → Start free trial
3. No credit card required for trial
4. You'll build 4 workflows here (see architecture/system-flow.md)

**After trial:** The demo will be done and submitted. Trial is sufficient.

---

## 4. Lovable (paid — you have this)

1. Log in to lovable.dev
2. Create a new project: "Fathom Trace Dashboard"
3. Use the prompt from architecture/lovable-prompt.md (to be created)

---

## Credential Storage

Create a local `.env` file (never commit this):

```
ANTHROPIC_API_KEY=sk-ant-...
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=app...
```

These will be entered directly into n8n as credentials (n8n has secure credential storage).
The `.env` file is just for local reference and any test scripts.

Add to `.gitignore`:
```
.env
```
