// AI Tools Store - Upcoming AI Tools & Innovations Showcase
import { toolsApi } from '../api/toolsApi.js';
import { renderNavbar, attachNavbarEvents } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { t } from '../i18n/i18n.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';
import { showToast } from '../utils/helpers.js';

export async function renderUpcomingToolsPage(root) {
  document.title = `🚀 Upcoming AI Tools & New Releases | ${t('nav.brand')}`;

  let upcomingTools = [];
  try {
    upcomingTools = await toolsApi.getUpcomingTools();
  } catch (err) {
    console.warn('[UpcomingToolsPage] Load warning:', err);
    upcomingTools = [];
  }

  let searchQuery = '';

  function filterTools() {
    if (!searchQuery.trim()) return upcomingTools;
    const q = searchQuery.toLowerCase().trim();
    return upcomingTools.filter((tool) => {
      const title = (tool.title || '').toLowerCase();
      const desc = (tool.description || '').toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }

  function renderGrid(list) {
    if (!list || list.length === 0) {
      return `
        <div class="empty-state-container" style="text-align: center; padding: 4.5rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-glass); border-radius: 20px; margin: 2rem 0; box-shadow: var(--shadow-card);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem; filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.4));">🚀</div>
          <h3 style="font-size: 1.45rem; color: var(--text-pure); margin-bottom: 0.5rem; font-weight: 700;">No Upcoming Tools Found</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem auto; font-size: 0.95rem; line-height: 1.6;">
            We are curating next-generation AI tools to release soon. Check back shortly or join our WhatsApp VIP community for instant release drops!
          </p>
          <a href="${defaultWhatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.75rem 1.75rem;">
            Join VIP WhatsApp Drop Channel
          </a>
        </div>
      `;
    }

    return `
      <div class="upcoming-tools-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; margin-top: 2rem;">
        ${list.map((tool) => {
          const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
          const imgSrc = tool.image && tool.image.trim() ? tool.image.trim() : fallbackImage;
          const badgeText = tool.badge || '🚀 UPCOMING';
          const statusDate = tool.expectedDate || 'Coming Soon';

          const whatsappMessage = encodeURIComponent(
            `🚀 *UPCOMING AI TOOL INQUIRY*\n` +
            `• Tool: ${tool.title}\n` +
            `• Status: ${statusDate}\n` +
            `Please notify me when this tool becomes available for purchase or preorder!`
          );

          let waLink = defaultWhatsappUrl || 'https://wa.me/923001234567';
          if (waLink.includes('chat.whatsapp.com') || waLink.includes('/channel/')) {
            // Keep invite link
          } else if (waLink.includes('?')) {
            waLink = `${waLink}&text=${whatsappMessage}`;
          } else {
            waLink = `${waLink}?text=${whatsappMessage}`;
          }

          return `
            <div class="upcoming-tool-card" data-id="${tool.id}" style="position: relative; background: linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(10, 15, 30, 0.98) 100%); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.2); display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
              
              <!-- Subtle Cyber Neon Overlay -->
              <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%); pointer-events: none; filter: blur(25px);"></div>
              
              <!-- Picture / Media Banner Container -->
              <div style="position: relative; height: 210px; overflow: hidden; background: #060d1a;">
                <img 
                  src="${imgSrc}" 
                  alt="${tool.title}" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                  loading="lazy"
                  onerror="this.src='${fallbackImage}';"
                  class="upcoming-card-img"
                />
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(10, 15, 30, 0.98) 0%, rgba(10, 15, 30, 0.4) 50%, transparent 100%);"></div>
                
                <!-- Badge Tag -->
                <div style="position: absolute; top: 14px; left: 14px; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="badge" style="background: linear-gradient(135deg, #0284c7, #38bdf8); color: #ffffff; font-weight: 800; font-size: 0.75rem; padding: 0.32rem 0.8rem; border-radius: 999px; box-shadow: 0 4px 12px rgba(56, 189, 248, 0.45); letter-spacing: 0.03em;">
                    ${badgeText}
                  </span>
                  <span class="badge" style="background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-weight: 700; font-size: 0.75rem; padding: 0.32rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.3rem;">
                    <span>⏳</span> <span>${statusDate}</span>
                  </span>
                </div>
              </div>

              <!-- Content Body -->
              <div style="padding: 1.6rem 1.6rem 1.4rem 1.6rem; flex: 1; display: flex; flex-direction: column;">
                <!-- Title -->
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-pure); margin-bottom: 0.75rem; line-height: 1.35; letter-spacing: -0.01em;">
                  ${tool.title}
                </h3>

                <!-- Description -->
                <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.5rem; flex: 1; white-space: pre-line;">
                  ${tool.description || 'Exclusive upcoming tool joining the AI Tools Store catalog very soon.'}
                </p>

                <!-- Action Button: Early Access / Notify Me -->
                <div style="padding-top: 1rem; border-top: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: space-between; gap: 0.85rem;">
                  <span style="font-size: 0.78rem; color: #38bdf8; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8;"></span>
                    In Pre-Launch Pipeline
                  </span>

                  <a 
                    href="${waLink}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-upcoming-notify" 
                    style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.55rem 1.15rem; border-radius: 12px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(99, 102, 241, 0.2)); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; font-weight: 700; font-size: 0.82rem; text-decoration: none; transition: all 0.2s ease;"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/>
                    </svg>
                    <span>Notify Me</span>
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderPageContent() {
    const filtered = filterTools();

    root.innerHTML = `
      ${renderNavbar('/upcoming')}

      <main class="main-content container upcoming-page fade-in" style="padding-top: 2rem; padding-bottom: 4rem;">
        
        <!-- Hero Header -->
        <div class="deals-hero-section" style="position: relative; text-align: center; padding: 3rem 1.5rem 2.5rem 1.5rem; background: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.5) 75%); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 28px; margin-bottom: 2.5rem; overflow: hidden; box-shadow: 0 15px 40px -15px rgba(56, 189, 248, 0.25);">
          
          <div style="position: absolute; top: -70px; left: 50%; transform: translateX(-50%); width: 450px; height: 180px; background: radial-gradient(ellipse, rgba(56, 189, 248, 0.3) 0%, transparent 70%); filter: blur(40px); pointer-events: none;"></div>

          <div style="display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.4rem 1rem; border-radius: 999px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); margin-bottom: 1.25rem;">
            <span style="font-size: 1.1rem;">🚀</span>
            <span style="font-size: 0.82rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em;">Roadmap & Pre-Launches</span>
          </div>

          <h1 style="font-size: 2.6rem; font-weight: 900; color: var(--text-pure); margin-bottom: 0.85rem; letter-spacing: -0.02em;">
            Upcoming <span style="background: linear-gradient(135deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI Tools</span>
          </h1>

          <p style="max-width: 620px; margin: 0 auto 1.75rem auto; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.65;">
            Get a sneak peek at revolutionary AI tools landing soon. Reserve early access, pre-order member slots, or request notification right before launch.
          </p>

          <!-- Search Filter Bar -->
          <div style="max-width: 500px; margin: 0 auto; position: relative;">
            <input 
              type="text" 
              id="upcoming-search-input" 
              placeholder="Search upcoming AI tools..." 
              value="${searchQuery}" 
              style="width: 100%; padding: 0.85rem 1.25rem 0.85rem 2.85rem; border-radius: 999px; background: rgba(15, 23, 42, 0.8); border: 1.5px solid rgba(56, 189, 248, 0.35); color: var(--text-pure); font-size: 0.95rem; outline: none; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);"
            />
            <svg style="position: absolute; left: 1.15rem; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--accent-cyan);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        <!-- Upcoming Tools Grid Container -->
        <div id="upcoming-grid-wrap">
          ${renderGrid(filtered)}
        </div>

      </main>

      ${renderFooter()}
    `;

    attachNavbarEvents();

    const searchInput = document.getElementById('upcoming-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        searchQuery = e.target.value;
        const gridWrap = document.getElementById('upcoming-grid-wrap');
        if (gridWrap) {
          gridWrap.innerHTML = renderGrid(filterTools());
        }
      };
    }
  }

  renderPageContent();
}
