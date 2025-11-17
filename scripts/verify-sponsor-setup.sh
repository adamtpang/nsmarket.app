#!/bin/bash

# NSMarket Sponsor System - Setup Verification Script

echo "🔍 NSMarket Sponsor System - Setup Verification"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Stripe Keys
echo "1️⃣  Checking Stripe configuration..."
if grep -q "pk_test_xxx" .env.local 2>/dev/null; then
  echo -e "${RED}❌ Stripe keys not configured (still placeholder)${NC}"
  echo "   Action: Get real keys from https://dashboard.stripe.com/test/apikeys"
else
  if grep -q "STRIPE_SECRET_KEY=sk_test_" .env.local && grep -q "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_" .env.local; then
    echo -e "${GREEN}✅ Stripe keys configured${NC}"
  else
    echo -e "${RED}❌ Stripe keys incomplete${NC}"
  fi
fi

# Check 2: Webhook Secret
echo ""
echo "2️⃣  Checking webhook configuration..."
if grep -q "STRIPE_WEBHOOK_SECRET=whsec_xxx" .env.local 2>/dev/null; then
  echo -e "${YELLOW}⚠️  Webhook secret is placeholder${NC}"
  echo "   Action: Run 'stripe listen --forward-to localhost:3000/api/sponsors/webhook'"
  echo "   Then copy the webhook secret to .env.local"
else
  if grep -q "STRIPE_WEBHOOK_SECRET=whsec_" .env.local; then
    echo -e "${GREEN}✅ Webhook secret configured${NC}"
  else
    echo -e "${RED}❌ Webhook secret missing${NC}"
  fi
fi

# Check 3: Sponsor Files
echo ""
echo "3️⃣  Checking sponsor files..."
FILES=(
  "app/sponsor/page.tsx"
  "app/sponsor/success/page.tsx"
  "app/api/sponsors/checkout/route.ts"
  "app/api/sponsors/webhook/route.ts"
  "app/api/sponsors/route.ts"
  "components/sponsor-display.tsx"
  "supabase/migrations/007_create_sponsors_table.sql"
)

ALL_EXISTS=true
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file ${RED}MISSING${NC}"
    ALL_EXISTS=false
  fi
done

# Check 4: Dev Server
echo ""
echo "4️⃣  Checking dev server..."
if pgrep -f "next dev" > /dev/null; then
  echo -e "${GREEN}✅ Next.js dev server running${NC}"
else
  echo -e "${RED}❌ Dev server not running${NC}"
  echo "   Action: Run 'npm run dev'"
fi

# Check 5: Stripe CLI
echo ""
echo "5️⃣  Checking Stripe CLI..."
if command -v stripe &> /dev/null; then
  echo -e "${GREEN}✅ Stripe CLI installed${NC}"
  if pgrep -f "stripe listen" > /dev/null; then
    echo -e "${GREEN}✅ Stripe listen is running${NC}"
  else
    echo -e "${YELLOW}⚠️  Stripe listen not running${NC}"
    echo "   Action: Run 'stripe listen --forward-to localhost:3000/api/sponsors/webhook'"
  fi
else
  echo -e "${RED}❌ Stripe CLI not installed${NC}"
  echo "   Action: Install with 'brew install stripe/stripe-cli/stripe'"
fi

# Check 6: Supabase
echo ""
echo "6️⃣  Checking Supabase configuration..."
if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local && grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
  echo -e "${GREEN}✅ Supabase keys configured${NC}"
else
  echo -e "${RED}❌ Supabase keys missing${NC}"
fi

# Summary
echo ""
echo "================================================"
echo "📋 NEXT STEPS:"
echo "================================================"
echo ""

if grep -q "pk_test_xxx" .env.local 2>/dev/null || grep -q "whsec_xxx" .env.local 2>/dev/null; then
  echo "1. Update .env.local with real Stripe keys"
  echo "2. Run: stripe listen --forward-to localhost:3000/api/sponsors/webhook"
  echo "3. Copy webhook secret to .env.local"
  echo "4. Restart dev server: npm run dev"
  echo "5. Run migration in Supabase SQL Editor"
  echo "6. Test at: http://localhost:3000/sponsor"
else
  echo "✅ Configuration looks good!"
  echo ""
  echo "Ready to test:"
  echo "1. Open: http://localhost:3000/sponsor"
  echo "2. Fill form with test data"
  echo "3. Use test card: 4242 4242 4242 4242"
  echo "4. Verify sponsor appears on homepage"
  echo ""
  echo "📖 See TEST_CHECKLIST.md for detailed testing steps"
fi

echo ""
