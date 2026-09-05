// AI Tools Store - Fast Search Modal Component (⌘K / Ctrl+K)
import { toolsApi } from '../api/toolsApi.js';
import { getToolIconSvg } from '../utils/helpers.js';

let isModalOpen = false;

export async function openSearchModal() {
  if (isModalOpen) return;
  isModalOpen = true;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  const allTools = await toolsApi.getTools();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'search-modal-backdrop';

  backdrop.innerHTML = `
    <div class="modal-card" style="max-width: 580px; padding: 1.5rem;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-pure); font-weight: 700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>Search AI Tools</span>
        </div>
        <button id="search-modal-close" class="modal-close-btn">&times;</button>
      </div>

      <div style="position: relative; margin-bottom: 1.25rem;">
        <input 
          type="text" 
          id="modal-search-input" 
          placeholder="Search by tool name, category, or workflow..."
          class="search-input-field"
          style="padding-left: 1rem; width: 100%; border-radius: var(--radius-md);"
          autofocus
        />
      </div>

      <div id="modal-search-results" style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 380px; overflow-y: auto;">
        ${renderResultItems(allTools.slice(0, 6))}
      </div>

      <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
        <span>Tip: Press <kbd class="kbd-shortcut">ESC</kbd> to exit</span>
        <span>${allTools.length} tools indexed</span>
      </div>
    </div>
  `;

  modalRoot.appendChild(backdrop);

  // Close logic
  const closeModal = () => {
    isModalOpen = false;
    backdrop.remove();
  };

  backdrop.onclick = closeModal;
  document.getElementById('search-modal-close').onclick = closeModal;

  // Filter input logic
  const input = document.getElementById('modal-search-input');
  const resultsContainer = document.getElementById('modal-search-results');

  setTimeout(() => input.focus(), 50);

  input.oninput = (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = allTools.filter((t) => 
      t.name.toLowerCase().includes(q) || 
      t.category.toLowerCase().includes(q) ||
      (t.shortDescription && t.shortDescription.toLowerCase().includes(q))
    );
    resultsContainer.innerHTML = filtered.length > 0
      ? renderResultItems(filtered)
      : `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No matching tools found for "${e.target.value}"</div>`;
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', handleKey);
    }
  };
  window.addEventListener('keydown', handleKey);
}

function renderResultItems(tools) {
  return tools.map((t) => `
    <a 
      href="#/tool/${t.id}" 
      onclick="document.getElementById('search-modal-backdrop')?.remove();"
      style="display: flex; align-items: center; gap: 0.85rem; padding: 0.65rem 0.85rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); text-decoration: none;"
    >
      <div style="width: 36px; height: 36px; border-radius: 8px; background: ${t.iconGradient || '#4f46e5'}; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
        ${getToolIconSvg(t.id, t.name)}
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h4 style="font-size: 0.92rem; color: var(--text-pure); font-weight: 700;">${t.name}</h4>
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-mint);">${t.price}</span>
        </div>
        <p style="font-size: 0.76rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${t.category} &bull; ${t.shortDescription || ''}
        </p>
      </div>
    </a>
  `).join('');
}
