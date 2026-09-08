// AI Tools Store - Dynamic "How to Use" & Tutorial Video Component
import { formatVideoEmbedUrl } from '../utils/helpers.js';

export function renderHowToUse(tool) {
  if (!tool) return '';

  const rawVideo = tool.tutorialVideoUrl || tool.videoUrl || tool.tutorial_video_url || '';
  const embedUrl = formatVideoEmbedUrl(rawVideo);
  const instructions = Array.isArray(tool.howToUse) && tool.howToUse.length > 0
    ? tool.howToUse
    : [
        { step: 1, title: 'Open the Tool', text: `Access the official ${tool.name} interface using the credentials sent to you.` },
        { step: 2, title: 'Create or Verify Account', text: 'Ensure your VIP plan is active in your profile settings.' },
        { step: 3, title: 'Select Required AI Feature', text: 'Choose from the available templates or multimodal prompts.' },
        { step: 4, title: 'Input Content or Prompt', text: 'Enter your custom instructions, parameters, or uploaded media.' },
        { step: 5, title: 'Generate & Export Result', text: 'Run generation and export in high-definition format.' }
      ];

  // Check if video is an iframe embed or direct MP4
  const isDirectVideo = embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm');

  return `
    <section class="how-to-use-section" id="how-to-use">
      <div class="section-header-row" style="margin-bottom: 2rem;">
        <div>
          <span class="badge badge-popular" style="margin-bottom: 0.5rem;">Interactive Guide</span>
          <h2 class="section-title">How to Use ${tool.name}</h2>
          <p style="margin-top: 0.35rem; color: var(--text-secondary);">
            Master ${tool.name} with this step-by-step video breakdown and instructions.
          </p>
        </div>
      </div>

      <div class="how-to-use-grid">
        <!-- Tutorial Video Player -->
        <div class="video-player-card">
          <div class="video-frame-wrap">
            ${
              isDirectVideo
                ? `<video src="${embedUrl}" controls playsinline poster="/assets/ai_hologram_orb.jpg"></video>`
                : embedUrl
                ? `<iframe 
                     src="${embedUrl}" 
                     title="${tool.name} Tutorial Video" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                     allowfullscreen>
                   </iframe>`
                : `<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--text-muted); flex-direction: column; gap: 0.5rem;">
                     <span>No tutorial video provided</span>
                   </div>`
            }
          </div>

          <div class="video-card-meta">
            <div>
              <h4>Official Walkthrough & Mastery</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Dynamically loaded for ${tool.name}</p>
            </div>
            <span class="video-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              HD Video
            </span>
          </div>
        </div>

        <!-- Step-by-Step Instructions -->
        <div class="steps-container">
          <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Step-by-Step Instructions</h3>
          ${instructions.map((item, index) => {
            const stepNum = item.step || (index + 1);
            const stepStr = String(stepNum).padStart(2, '0');
            return `
              <div class="step-card">
                <div class="step-number">${stepStr}</div>
                <div class="step-content">
                  <h4>${item.title || `Step ${stepNum}`}</h4>
                  <p>${item.text || ''}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}
