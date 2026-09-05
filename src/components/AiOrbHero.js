// AI Tools Store - Intelligent 3D Glowing AI Orb Hero Component
// Featuring 3 concentric revolving orbital rings with live rotating AI tool badges & brand logos

export const ORBIT_TOOLS = [
  // Ring 1 (Inner Ring - 4 Tools)
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'Multimodal AI',
    ring: 1,
    position: 'top',
    color: '#4285f4',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285f4"/>
            <stop offset="50%" stop-color="#9b72cf"/>
            <stop offset="100%" stop-color="#d96570"/>
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#geminiGrad)"/>
      </svg>
    `
  },
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'AI App Builder',
    ring: 1,
    position: 'right',
    color: '#ff3366',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff3366">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'Agentic AI',
    ring: 1,
    position: 'bottom',
    color: '#38bdf8',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#38bdf8" stroke-width="1.8"/>
        <polygon points="12,4 14.5,9.5 20,12 14.5,14.5 12,20 9.5,14.5 4,12 9.5,9.5" fill="#38bdf8"/>
      </svg>
    `
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'AI Workspace',
    ring: 1,
    position: 'left',
    color: '#ffffff',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#ffffff"/>
        <path d="M7 6l8 12V6h2v12h-2L7 6z" fill="#0f172a"/>
      </svg>
    `
  },

  // Ring 2 (Middle Ring - 4 Tools)
  {
    id: 'replit',
    name: 'Replit',
    category: 'AI Coding IDE',
    ring: 2,
    position: 'top',
    color: '#ff6b00',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H12V10H4V6Z" fill="#ff6b00"/>
        <path d="M12 10H20V14H12V10Z" fill="#ff9248"/>
        <path d="M4 14H12V18H4V14Z" fill="#ff6b00"/>
      </svg>
    `
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'AI Automation',
    ring: 2,
    position: 'right',
    color: '#ff6d5a',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6d5a" stroke-width="2.5" stroke-linecap="round">
        <circle cx="5" cy="12" r="3" fill="#ff6d5a"/>
        <circle cx="19" cy="6" r="3" fill="#ff6d5a"/>
        <circle cx="19" cy="18" r="3" fill="#ff6d5a"/>
        <path d="M8 12h5l3-6m-3 6l3 6"/>
      </svg>
    `
  },
  {
    id: 'make',
    name: 'Make.com',
    category: 'Visual Workflows',
    ring: 2,
    position: 'bottom',
    color: '#a855f7',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 12c0-3.3 2.7-6 6-6 2.5 0 4.6 1.5 5.5 3.7L12 12l3.5 2.3C14.6 16.5 12.5 18 10 18c-3.3 0-6-2.7-6-6z" fill="#818cf8"/>
        <path d="M20 12c0 3.3-2.7 6-6 6-2.5 0-4.6-1.5-5.5-3.7L12 12l-3.5-2.3C9.4 7.5 11.5 6 14 6c3.3 0 6 2.7 6 6z" fill="#c084fc"/>
      </svg>
    `
  },
  {
    id: 'kiro',
    name: 'Kiro',
    category: 'Intelligent AI',
    ring: 2,
    position: 'left',
    color: '#10b981',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,12 12,22 2,12" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.2)"/>
        <circle cx="12" cy="12" r="3.5" fill="#34d399"/>
      </svg>
    `
  },

  // Ring 3 (Outer Ring - 4 Tools)
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Integrations',
    ring: 3,
    position: 'top',
    color: '#ff4a00',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4a00" stroke-width="3" stroke-linecap="round">
        <line x1="12" y1="3" x2="12" y2="21"/>
        <line x1="4.22" y1="7.5" x2="19.78" y2="16.5"/>
        <line x1="4.22" y1="16.5" x2="19.78" y2="7.5"/>
      </svg>
    `
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'AI Video Editor',
    ring: 3,
    position: 'right',
    color: '#00f2fe',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <polygon points="4,5 12,11 4,17" fill="#00f2fe"/>
        <polygon points="20,5 12,11 20,17" fill="#ffffff"/>
        <circle cx="12" cy="11" r="2.5" fill="#38bdf8"/>
      </svg>
    `
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Flagship LLM',
    ring: 3,
    position: 'bottom',
    color: '#10a37f',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="2" stroke-linecap="round">
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10A10 10 0 0 1 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    `
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Generative Art',
    ring: 3,
    position: 'left',
    color: '#c084fc',
    logo: `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 17l8 3 8-3-2-2H6l-2 2z" fill="#c084fc"/>
        <polygon points="12,4 12,15 19,15" fill="#a855f7"/>
        <polygon points="10,6 10,15 5,15" fill="#e879f9"/>
      </svg>
    `
  }
];

export function renderAiOrbHero() {
  const ring1Tools = ORBIT_TOOLS.filter((t) => t.ring === 1);
  const ring2Tools = ORBIT_TOOLS.filter((t) => t.ring === 2);
  const ring3Tools = ORBIT_TOOLS.filter((t) => t.ring === 3);

  return `
    <div class="hero-orb-stage" aria-label="AI Tools 3D Orbital Universe">
      <!-- Ambient Multi-Layer Radial Glow -->
      <div class="orb-ambient-glow orb-ambient-glow-1"></div>
      <div class="orb-ambient-glow orb-ambient-glow-2"></div>

      <!-- Center 3D Floating Assembly -->
      <div class="orb-floating-assembly">
        <!-- The Glowing 3D AI Orb Sphere Body -->
        <div class="ai-sphere-core">
          <!-- Inner Deep Rotating Plasma Mesh -->
          <div class="sphere-plasma-mesh"></div>
          <!-- Internal Caustic Luminous Glow Spot -->
          <div class="sphere-caustic-core"></div>
          <!-- Specular Light Highlights -->
          <div class="sphere-specular-spot"></div>
          <div class="sphere-specular-subspot"></div>
          <!-- Fresnel Outer Rim Light Ring -->
          <div class="sphere-rim-fresnel"></div>
        </div>

        <!-- Drifting Ambient Star Particles -->
        <div class="orb-star-dot star-dot-1"></div>
        <div class="orb-star-dot star-dot-2"></div>
        <div class="orb-star-dot star-dot-3"></div>
        <div class="orb-star-dot star-dot-4"></div>
        <div class="orb-star-dot star-dot-5"></div>
        <div class="orb-star-dot star-dot-6"></div>
      </div>

      <!-- ================================================================== -->
      <!-- 3 CONCENTRIC 3D REVOLVING ORBITAL TRACKS WITH AI TOOLS (Gool Gool) -->
      <!-- ================================================================== -->

      <!-- ORBIT RING 1: INNER RING (340px) - Clockwise Rotation (22s) -->
      <div class="hero-orbit-ring ring-inner" data-ring="1">
        <!-- SVG glowing circular track with wave particle -->
        <div class="orbit-visual-circle ring-circle-inner"></div>
        <div class="orbit-glow-tracer tracer-1"></div>

        ${ring1Tools.map((t) => `
          <div class="orbit-tool-slot slot-${t.position}">
            <div class="orbit-tool-card tool-item-${t.id} counter-anim-cw" data-tool-name="${t.name}" style="--tool-glow: ${t.color};" title="Explore ${t.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${t.color}40;">
                ${t.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${t.name}</span>
                <span class="orbit-tool-subtitle">${t.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${t.color}; box-shadow: 0 0 8px ${t.color};"></span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- ORBIT RING 2: MIDDLE RING (460px) - Counter-Clockwise Rotation (32s) -->
      <div class="hero-orbit-ring ring-middle" data-ring="2">
        <div class="orbit-visual-circle ring-circle-middle"></div>
        <div class="orbit-glow-tracer tracer-2"></div>

        ${ring2Tools.map((t) => `
          <div class="orbit-tool-slot slot-${t.position}">
            <div class="orbit-tool-card tool-item-${t.id} counter-anim-ccw" data-tool-name="${t.name}" style="--tool-glow: ${t.color};" title="Explore ${t.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${t.color}40;">
                ${t.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${t.name}</span>
                <span class="orbit-tool-subtitle">${t.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${t.color}; box-shadow: 0 0 8px ${t.color};"></span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- ORBIT RING 3: OUTER RING (580px) - Clockwise Rotation (44s) -->
      <div class="hero-orbit-ring ring-outer" data-ring="3">
        <div class="orbit-visual-circle ring-circle-outer"></div>
        <div class="orbit-glow-tracer tracer-3"></div>

        ${ring3Tools.map((t) => `
          <div class="orbit-tool-slot slot-${t.position}">
            <div class="orbit-tool-card tool-item-${t.id} counter-anim-cw-outer" data-tool-name="${t.name}" style="--tool-glow: ${t.color};" title="Explore ${t.name}">
              <div class="orbit-tool-icon" style="box-shadow: 0 0 12px ${t.color}40;">
                ${t.logo}
              </div>
              <div class="orbit-tool-meta">
                <span class="orbit-tool-title">${t.name}</span>
                <span class="orbit-tool-subtitle">${t.category}</span>
              </div>
              <span class="orbit-tool-dot" style="background: ${t.color}; box-shadow: 0 0 8px ${t.color};"></span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Hint Overlay on Stage Hover -->
      <div class="orbit-hover-hint">
        <span>⚡ Hover to Pause Orbit • Click Any Tool to Explore</span>
      </div>
    </div>
  `;
}

// Global one-time interaction delegation for clicking any revolving tool badge
if (typeof window !== 'undefined' && !window.__orbHeroEventsBound) {
  window.__orbHeroEventsBound = true;
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.orbit-tool-card');
    if (card) {
      e.preventDefault();
      const toolName = card.dataset.toolName;
      if (toolName) {
        window.location.hash = `#/tools?q=${encodeURIComponent(toolName)}`;
      }
    }
  });
}
