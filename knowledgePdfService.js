// AI Tools Store - Real-Time Customer Knowledge Base PDF Generator
// Designed for n8n RAG Vector Store & Admin Export
// Strictly excludes all internal admin panel details, user lists, and system secrets.

import PDFDocument from 'pdfkit';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://rqemoitjanmxsmcmveso.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk';
const DEFAULT_WHATSAPP = process.env.VITE_DEFAULT_WHATSAPP_URL || 'https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q';

/**
 * Fetch dynamic real-time data from Supabase
 */
async function fetchStoreKnowledge() {
  let tools = [];
  let deals = [];
  let upcoming = [];

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 1. Fetch only ACTIVE tools for public knowledge
    const { data: toolsData, error: toolsErr } = await supabase
      .from('tools')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!toolsErr && toolsData) {
      tools = toolsData;
    }

    // 2. Fetch active hot deals
    const { data: dealsData } = await supabase
      .from('hot_deals')
      .select('*')
      .eq('active', true);
    if (dealsData) deals = dealsData;

    // 3. Fetch active upcoming tools
    const { data: upcomingData } = await supabase
      .from('upcoming_tools')
      .select('*')
      .eq('active', true);
    if (upcomingData) upcoming = upcomingData;

  } catch (err) {
    console.warn('[Knowledge PDF] Supabase live query failed, using baseline knowledge:', err.message);
  }

  return { tools, deals, upcoming };
}

/**
 * Generates and pipes the dynamic Knowledge Base PDF to any writable stream (e.g. Express res)
 */
export async function generateKnowledgePdf(writeStream) {
  const { tools, deals, upcoming } = await fetchStoreKnowledge();
  const generationDate = new Date().toUTCString();

  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    info: {
      Title: 'AI Tools Store - Official Customer Knowledge Base',
      Author: 'AI Tools Store',
      Subject: 'Customer Knowledge Base for AI Support & n8n RAG Integration',
      Keywords: 'AI Tools, Policies, Refund Policy, Activation Procedure, Pricing',
      CreationDate: new Date()
    }
  });

  doc.pipe(writeStream);

  // Helper color palette
  const PRIMARY = '#0f172a';
  const ACCENT = '#0284c7';
  const MUTED = '#475569';
  const BORDER = '#cbd5e1';
  const DANGER = '#be123c';
  const SUCCESS = '#047857';

  // --- HEADER / TITLE ---
  doc.rect(40, 40, 515, 60).fill('#0f172a');
  doc.fillColor('#ffffff').fontSize(20).font('Helvetica-Bold')
     .text('AI TOOLS STORE', 55, 52);
  doc.fontSize(10).font('Helvetica')
     .fillColor('#38bdf8')
     .text('Official Customer Knowledge Base & AI Agent Context Document', 55, 76);

  doc.moveDown(2.5);

  // Document metadata bar
  doc.fillColor(MUTED).fontSize(8).font('Helvetica')
     .text(`Document Version: Real-Time Dynamic Build | Generated: ${generationDate}`, 40, 110)
     .text(`Target Scope: Customer-Facing Knowledge Base (Zero Admin Data)`, 40, 120);

  doc.moveDown(1.5);
  doc.strokeColor(BORDER).lineWidth(0.5).moveTo(40, 132).lineTo(555, 132).stroke();
  doc.y = 142;

  // --- SECTION 1: COMPANY OVERVIEW & SUPPORT ---
  doc.fillColor(ACCENT).fontSize(14).font('Helvetica-Bold').text('1. COMPANY OVERVIEW & CONCIERGE SUPPORT');
  doc.moveDown(0.4);

  doc.fillColor(PRIMARY).fontSize(9).font('Helvetica')
     .text('AI Tools Store is a premium marketplace providing hand-curated, verified licenses and subscriptions for top artificial intelligence software.', { lineGap: 3 })
     .text('Key Operational Guarantees:', { font: 'Helvetica-Bold', lineGap: 2 });

  doc.list([
    'Instant Activation: Most accounts are onboarded and provisioned within 5 to 15 minutes.',
    '100% Genuine Licenses: Zero cracked software, verified legitimate access without random password lockouts.',
    'Dedicated WhatsApp Concierge: Direct human assistance for onboarding, billing, and technical guidance.',
    `WhatsApp Support Link: ${DEFAULT_WHATSAPP}`,
    'Operating Hours: 24/7 Digital Concierge Support.'
  ], { bulletRadius: 2, textIndent: 12, lineGap: 2 });

  doc.moveDown(1);
  doc.strokeColor(BORDER).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(1);

  // --- SECTION 2: OFFICIAL POLICIES (CRITICAL RAG CONTEXT) ---
  doc.fillColor(ACCENT).fontSize(14).font('Helvetica-Bold').text('2. STORE POLICIES & CUSTOMER REGULATIONS');
  doc.moveDown(0.4);

  // Policy 1: Rules & Regulations (Fixed Pricing)
  doc.fillColor(PRIMARY).fontSize(11).font('Helvetica-Bold').text('Policy 1: Rules & Regulations (100% Fixed Pricing)');
  doc.fillColor(MUTED).fontSize(9).font('Helvetica')
     .text('Summary for AI Agent & Customers:', { font: 'Helvetica-Bold', lineGap: 2 });

  doc.list([
    'Strictly Fixed Pricing: All tool prices displayed across the platform are finalized, transparent, and non-negotiable.',
    'No Bargaining: Customer support agents and WhatsApp staff have ZERO authority to negotiate, discount, or alter prices. Customers must not engage in bargaining or prolonged price arguments.',
    'Official Discounts: Customers seeking savings or promotions must be directed to the Hot Deals page (#/deals) where verified Buy-1-Get-1 or percentage discounts are automatically applied.',
    'Courteous Communication: Polite and respectful communication is strictly required. Harassment or abuse regarding fixed prices leads to immediate termination of support.'
  ], { bulletRadius: 2, textIndent: 12, lineGap: 3 });

  doc.moveDown(0.8);

  // Policy 2: Refund Policy
  doc.fillColor(DANGER).fontSize(11).font('Helvetica-Bold').text('Policy 2: Refund & Replacement Policy (Digital Assets)');
  doc.fillColor(MUTED).fontSize(9).font('Helvetica')
     .text('Summary for AI Agent & Customers:', { font: 'Helvetica-Bold', lineGap: 2 });

  doc.list([
    'Intangible Digital Goods: Software subscriptions and account access are digital goods, not physical products. Once an account or license is activated, it cannot be canceled, reactivated, or refunded for cash.',
    'When Replacements/Refunds ARE Granted: Eligible ONLY if the customer strictly followed the guidelines and restrictions listed in the tool description, and a verified technical outage or invalid credential occurs that support cannot resolve within 24 to 48 hours.',
    'Non-Eligible Scenarios: No refunds or replacements if the customer changes their mind, failed to read system requirements/rules, violated usage limits, or attempted prohibited multi-device sharing.'
  ], { bulletRadius: 2, textIndent: 12, lineGap: 3 });

  doc.moveDown(0.8);

  // Policy 3: Activation Procedure
  doc.fillColor(SUCCESS).fontSize(11).font('Helvetica-Bold').text('Policy 3: Activation Procedure & Video Reference');
  doc.fillColor(MUTED).fontSize(9).font('Helvetica')
     .text('Summary for AI Agent & Customers:', { font: 'Helvetica-Bold', lineGap: 2 });

  doc.list([
    'Mandatory Reference Video: Every tool details page contains an official reference video walkthrough and sequential step guide.',
    'Step-by-Step Compliance: Customers MUST watch the reference video thoroughly and activate their access exactly as demonstrated.',
    'Loss of Service Disclaimer: If the customer acts upon their own discretion (e.g. changing root master passwords, altering recovery emails, modifying security settings, or bypassing the guide), AI Tools Store is NOT responsible for any loss of service, account ban, or revocation.',
    'Concierge Help: If the customer encounters confusion or an unfamiliar screen, they must pause and message WhatsApp Concierge BEFORE attempting unauthorized changes.'
  ], { bulletRadius: 2, textIndent: 12, lineGap: 3 });

  doc.moveDown(1);
  doc.addPage();

  // --- SECTION 3: REAL-TIME TOOLS & PRODUCTS CATALOG ---
  doc.fillColor(ACCENT).fontSize(14).font('Helvetica-Bold').text('3. CURRENT AI TOOLS CATALOG (REAL-TIME DATA)');
  doc.moveDown(0.3);
  doc.fillColor(MUTED).fontSize(8).font('Helvetica')
     .text(`Total Active Tools Listed: ${tools.length} | Synced directly from Store Database`, { lineGap: 8 });

  if (tools.length === 0) {
    doc.fillColor(MUTED).fontSize(9).font('Helvetica-Oblique').text('No active tools currently returned by database.');
  } else {
    tools.forEach((tool, index) => {
      // Check remaining page space to prevent awkward page splits
      if (doc.y > 680) {
        doc.addPage();
      }

      const toolName = tool.name || 'AI Tool';
      const category = tool.category || 'General AI';
      const basePrice = tool.price || 'Market Rate';
      const discount = tool.discount_percent ? ` (${tool.discount_percent}% OFF)` : '';
      const shortDesc = tool.short_description || tool.full_description || 'Premium artificial intelligence tool.';
      const video = tool.tutorial_video_url ? `Reference Video: ${tool.tutorial_video_url}` : 'Reference Video: Available on tool page';

      // Tool Box Header
      doc.rect(40, doc.y, 515, 18).fill('#f1f5f9');
      doc.fillColor(PRIMARY).fontSize(9.5).font('Helvetica-Bold')
         .text(`${index + 1}. ${toolName} [${category}]`, 48, doc.y - 14);
      doc.fillColor(ACCENT).fontSize(9).font('Helvetica-Bold')
         .text(`${basePrice}${discount}`, 420, doc.y - 13, { width: 130, align: 'right' });

      doc.moveDown(0.6);

      // Tool Details
      doc.fillColor(PRIMARY).fontSize(8.5).font('Helvetica')
         .text(`Description: ${shortDesc}`, 48, doc.y, { width: 500, lineGap: 2 });

      if (tool.country_pricing && typeof tool.country_pricing === 'object') {
        const pkr = tool.country_pricing['Pakistan'] ? `PKR ${tool.country_pricing['Pakistan']}` : null;
        const inr = tool.country_pricing['India'] ? `INR ${tool.country_pricing['India']}` : null;
        const aed = tool.country_pricing['United Arab Emirates'] ? `AED ${tool.country_pricing['United Arab Emirates']}` : null;
        const sar = tool.country_pricing['Saudi Arabia'] ? `SAR ${tool.country_pricing['Saudi Arabia']}` : null;
        const usd = tool.country_pricing['United States'] ? `USD ${tool.country_pricing['United States']}` : null;
        const rates = [pkr, inr, aed, sar, usd].filter(Boolean).join(' | ');
        if (rates) {
          doc.fillColor(MUTED).fontSize(8).font('Helvetica')
             .text(`Regional Pricing: ${rates}`, 48, doc.y, { width: 500, lineGap: 2 });
        }
      }

      if (Array.isArray(tool.features) && tool.features.length > 0) {
        doc.fillColor(MUTED).fontSize(8).font('Helvetica')
           .text(`Key Capabilities: ${tool.features.slice(0, 4).join(', ')}`, 48, doc.y, { width: 500, lineGap: 2 });
      }

      doc.fillColor(MUTED).fontSize(8).font('Helvetica-Oblique')
         .text(`${video} | Activation: Strictly follow provided reference walkthrough.`, 48, doc.y, { width: 500 });

      doc.moveDown(0.8);
    });
  }

  // --- SECTION 4: HOT DEALS & PROMOTIONS ---
  if (doc.y > 660) {
    doc.addPage();
  } else {
    doc.moveDown(1);
  }

  doc.strokeColor(BORDER).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.8);

  doc.fillColor(ACCENT).fontSize(14).font('Helvetica-Bold').text('4. ACTIVE HOT DEALS & UPCOMING RELEASES');
  doc.moveDown(0.4);

  if (deals.length > 0) {
    doc.fillColor(PRIMARY).fontSize(10).font('Helvetica-Bold').text('Current Promotional Deals:');
    deals.forEach((d) => {
      doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
         .text(`• ${d.title || d.name || 'Hot Deal'}: ${d.description || 'Special package'} (Discount: ${d.discount_badge || 'Active'})`);
    });
    doc.moveDown(0.5);
  } else {
    doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
       .text('All current discounts and package offers are listed live at #/deals.');
    doc.moveDown(0.5);
  }

  if (upcoming.length > 0) {
    doc.fillColor(PRIMARY).fontSize(10).font('Helvetica-Bold').text('Upcoming Tools (Coming Soon):');
    upcoming.forEach((u) => {
      doc.fillColor(MUTED).fontSize(8.5).font('Helvetica')
         .text(`• ${u.name || 'Upcoming Tool'} [${u.category || 'AI'}]: ${u.expected_date ? `Expected: ${u.expected_date}` : 'Releasing soon'}`);
    });
  }

  // --- SECTION 5: CUSTOMER ONBOARDING FAQ & INSTRUCTIONS ---
  if (doc.y > 620) {
    doc.addPage();
  } else {
    doc.moveDown(1);
  }

  doc.strokeColor(BORDER).lineWidth(0.5).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.8);

  doc.fillColor(ACCENT).fontSize(14).font('Helvetica-Bold').text('5. CUSTOMER ONBOARDING & PURCHASE WORKFLOW');
  doc.moveDown(0.4);

  doc.fillColor(PRIMARY).fontSize(9).font('Helvetica')
     .text('Standard Ordering Flow for AI Agent Reference:', { font: 'Helvetica-Bold', lineGap: 3 });

  doc.list([
    'Step 1: The user explores tools or deals on the website (or asks the AI Support Agent).',
    'Step 2: The user clicks "Buy Now via WhatsApp" on any tool card or details page.',
    'Step 3: A pre-filled WhatsApp message connects the customer directly to our support concierge.',
    'Step 4: Once payment is received, credentials or license invites are delivered within 5–15 minutes.',
    'Step 5: The customer watches the reference video tutorial on the tool details page to activate their access safely.'
  ], { bulletRadius: 2, textIndent: 12, lineGap: 3 });

  doc.moveDown(1.5);
  doc.fillColor(MUTED).fontSize(8).font('Helvetica-Oblique')
     .text('--- End of Official Customer Knowledge Base Document ---', { align: 'center' });

  // Finalize PDF
  doc.end();
}
