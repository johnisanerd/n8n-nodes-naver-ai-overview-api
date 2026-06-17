# n8n-nodes-naver-ai-overview-api

An [n8n](https://n8n.io/) community node that fetches the Naver AI Overview for a query and returns the summary (as markdown) plus its source references. It is backed by the [Naver AI Overview API](https://apify.com/johnvc/naver-ai-overview-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns whether an AI Overview is present, the overview text as markdown, the source references, and related questions. It also works as an **AI Agent tool**, so an agent can read Naver's AI answer on demand. This is useful for **Korean answer engine optimization (AEO)** and monitoring how a brand appears in Naver's AI results.

- Fetch the Naver AI Overview summary and references for any query
- Get the answer as ready-to-use markdown
- Choose how much data to return: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-naver-ai-overview-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Naver AI Overview** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**AI Overview > Get** returns the Naver AI Overview for a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to fetch the Naver AI Overview for. Required. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

One item is returned per query. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `query`, `aiOverviewPresent`, `overview` (the markdown summary), `references` (each with `title` and `link`), and `relatedQuestions`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `result_type` | string | Result type, for example `ai_overview` |
| `query` | string | The query that was run |
| `ai_overview_present` | boolean | Whether an AI Overview was returned |
| `markdown` | string | The overview content as markdown |
| `text_blocks` | array | The overview content blocks |
| `references` | array | Source references with titles and links |
| `media` | array | Media included in the overview |
| `related_questions` | array | Related questions Naver surfaced |
| `fetched_at` | string | When the overview was fetched (ISO 8601) |

## Example workflows

### 1. Monitor Naver AI Overview for brand terms

1. **Schedule Trigger**: run weekly.
2. **Naver AI Overview**: Search Query a brand or topic term, Output `Simplified`.
3. **Google Sheets**: log `aiOverviewPresent` and `overview` over time.

### 2. Track cited sources

1. **Manual Trigger**.
2. **Naver AI Overview**: your query.
3. **Split Out**: expand `references` and record which domains are cited.

### 3. Let an AI Agent read the AI Overview

1. **AI Agent** node.
2. Attach **Naver AI Overview** as a tool.
3. Ask a Korean-market question; the agent calls the node (in Simplified mode) and answers with the overview and sources.

## Pricing

This node calls the [Naver AI Overview API](https://apify.com/johnvc/naver-ai-overview-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/naver-ai-overview-api?fpr=9n7kx3) for current rates.

## Resources

- [Naver AI Overview API on Apify](https://apify.com/johnvc/naver-ai-overview-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-naver-ai-overview-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
