# Discord Job Board Scraping - Research & Implementation Plan

## Goal
Auto-scrape NS Discord hiring threads and convert them to job listings on nsmarket.app

## Research: How Kamil Did NSAssistant Bot

### Key Questions to Answer:
1. What Discord API/library did Kamil use?
2. How does the bot authenticate with Discord?
3. Which channels does it monitor?
4. How does it parse message content?
5. How frequently does it scrape?

### Action Items:
- [ ] Find NSAssistant bot repository/documentation
- [ ] Review Kamil's Discord bot code
- [ ] Understand Discord.js or Discord.py implementation
- [ ] Learn about Discord bot permissions needed

---

## Discord Scraping Approaches

### Option 1: Discord Bot (Recommended)
**Pros:**
- Real-time updates when jobs are posted
- Can use official Discord API
- Can respond to commands
- Legitimate and within Discord TOS

**Cons:**
- Requires bot approval from NS Discord admins
- Need to host the bot somewhere
- More complex initial setup

**Tech Stack:**
- `discord.js` (Node.js) or `discord.py` (Python)
- Bot token from Discord Developer Portal
- Webhook or API integration with nsmarket.app

### Option 2: Manual Export + Batch Processing
**Pros:**
- Simpler to implement initially
- No bot hosting required
- Can test AI conversion workflow first

**Cons:**
- Manual step required periodically
- Not real-time
- Harder to maintain long-term

**Tech Stack:**
- Export Discord messages to JSON/CSV
- Claude API for converting posts to structured listings
- Batch upload script

---

## Implementation Plan

### Phase 1: Locate Hiring Threads (20 min)
- [ ] Find all NS Discord channels where jobs are posted
- [ ] Document channel IDs and names
- [ ] Note posting patterns (frequency, format, who posts)
- [ ] Get 3-6 months of sample posts

Example channels to check:
- `#jobs`
- `#hiring`
- `#opportunities`
- `#marketplace`
- `#services`

### Phase 2: Export/Scrape Data (30 min)
Manual approach:
- [ ] Copy paste recent hiring posts
- [ ] Save as structured text/JSON
- [ ] Include: timestamp, author, content, reactions

Bot approach:
- [ ] Set up Discord bot application
- [ ] Get bot token
- [ ] Request permissions from NS admins
- [ ] Deploy bot to read messages

### Phase 3: Clean & Structure Data (1.5 hrs)
Create parser that extracts:
- Job title
- Job type (full-time, contract, gig, etc.)
- Description
- Requirements (if mentioned)
- Pay/budget (if mentioned)
- Contact info (Discord username)
- Posted by (seller_name)

### Phase 4: Test AI Translation (30 min)
**Prompt Template:**
```
Convert this Discord job posting into a structured listing:

[RAW POST CONTENT]

Extract:
- Title: (concise job title)
- Category: (jobs or gigs)
- Subcategory: (full-time, part-time, contract, internship, OR tech, design, writing, marketing, operations)
- Description: (clean, professional description)
- Price: (salary/budget if mentioned, otherwise 0)
- Seller Name: (person/company posting)
- Discord: (contact username)
```

Test with 3-5 real posts and validate outputs.

### Phase 5: Build Batch Processing Script (1.5 hrs)

**Pseudocode:**
```javascript
// Read scraped Discord posts
const posts = readDiscordExport()

// For each post
for (const post of posts) {
  // Use Claude API to convert to structured data
  const listing = await convertWithClaude(post)

  // Validate required fields
  if (!listing.title || !listing.description) {
    console.log('Skipping invalid post:', post.id)
    continue
  }

  // Insert into Supabase
  await supabase.from('listings').insert({
    title: listing.title,
    category: listing.category,
    subcategory: listing.subcategory,
    description: listing.description,
    price: listing.price || 0,
    seller_name: listing.seller_name,
    discord: listing.discord,
    available: true,
    views: 0,
    seller_id: 'discord-bot',
    images: []
  })
}
```

### Phase 6: Review AI Outputs (45 min)
- [ ] Quality check 10-20 generated listings
- [ ] Refine prompt if needed
- [ ] Fix common parsing errors
- [ ] Ensure Discord usernames are captured correctly

### Phase 7: Upload to Job Board (30 min)
- [ ] Run batch script
- [ ] Verify listings appear on homepage
- [ ] Check for duplicates
- [ ] Tag auto-imported listings somehow (e.g., special seller_id)

### Phase 8: Announce (15 min)
Post in NS channels:
> "🎉 New: NS Job Board on nsmarket.app!
>
> We've imported [X] recent job postings from Discord. Now you can:
> - Browse all NS opportunities in one place
> - Search by job type, category, keyword
> - Post your own jobs/gigs
> - Contact directly via Discord
>
> Check it out: nsmarket.app"

---

## Discord Bot Implementation Details

### Setup Steps:
1. Go to https://discord.com/developers/applications
2. Create New Application → "NS Market Bot"
3. Bot tab → Add Bot → Get Token
4. OAuth2 → Scopes: `bot`, Permissions: `Read Messages`, `Read Message History`
5. Generate invite URL, send to NS Discord admin

### Bot Code Structure (discord.js):
```javascript
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on('messageCreate', async (message) => {
  // Filter to specific channels
  if (!['jobs', 'hiring'].includes(message.channel.name)) return

  // Skip bot messages
  if (message.author.bot) return

  // Process message and create listing
  const listing = await parseJobPost(message)
  await createListingInSupabase(listing)
})

client.login(process.env.DISCORD_BOT_TOKEN)
```

---

## Next Steps

1. **Choose approach**: Bot (long-term) or Manual export (MVP)?
2. **Get NS Discord access**: Contact admins for bot approval or channel export
3. **Test AI conversion**: Run Claude on 3-5 sample posts
4. **Build MVP**: Either bot or batch script
5. **Deploy & test**: Import first batch of jobs
6. **Iterate**: Improve based on quality of auto-imported listings

---

## Resources to Check

- [ ] Find Kamil's NSAssistant bot repo/docs
- [ ] Discord.js documentation: https://discord.js.org/
- [ ] Discord Bot Best Practices
- [ ] Claude API for text processing
- [ ] Supabase batch insert patterns
