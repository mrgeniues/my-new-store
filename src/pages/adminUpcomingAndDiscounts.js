// AI Tools Store - Admin Module: Upcoming Tools & Dynamic Discounts Management
import { toolsApi } from '../api/toolsApi.js';
import { uploadToolImage } from '../lib/supabase.js';
import { saveAppSettings, getAppSettings } from '../lib/settings.js';
import { showToast, getToolLocalizedPrice, calculateToolDiscountPrice, getCountryFlag } from '../utils/helpers.js';

// ============================================================================
// 1. UPCOMING TOOLS TABLE & MANAGEMENT
// ============================================================================

export function renderUpcomingToolsTableHtml(upcomingList) {
  if (!upcomingList || upcomingList.length === 0) {
    return `
      <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2.8rem; margin-bottom: 0.5rem;">🚀</div>
        <p style="font-weight: 700; color: var(--text-pure); font-size: 1.1rem;">No upcoming tools scheduled yet.</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Click "+ Add Upcoming Tool" to publish an upcoming tool with Picture, Title, and Description.</p>
      </div>
    `;
  }

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 75px;">Picture</th>
          <th>Tool Title</th>
          <th>Description Preview</th>
          <th>Expected Date / Badge</th>
          <th>Visibility</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${upcomingList.map((item) => {
          const fallbackImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
          const imgSrc = item.image && item.image.trim() ? item.image.trim() : fallbackImg;

          return `
            <tr>
              <td>
                <div style="width: 58px; height: 44px; border-radius: 8px; overflow: hidden; background: #070d18; border: 1px solid rgba(56, 189, 248, 0.4);">
                  <img src="${imgSrc}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${fallbackImg}';" />
                </div>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                  <strong style="color: var(--text-pure); font-size: 0.95rem;">${item.title}</strong>
                  <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">slug: ${item.slug || 'auto'}</span>
                </div>
              </td>
              <td style="max-width: 320px;">
                <p style="margin: 0; font-size: 0.82rem; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${item.description || 'No description added yet.'}
                </p>
              </td>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.3rem; align-items: flex-start;">
                  <span class="badge" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(56, 189, 248, 0.3)); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.45); font-weight: 800; font-size: 0.72rem; padding: 0.2rem 0.55rem;">
                    ${item.badge || '🚀 UPCOMING'}
                  </span>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">
                    ⏳ ${item.expectedDate || 'Coming Soon'}
                  </span>
                </div>
              </td>
              <td>
                <button 
                  type="button"
                  class="badge toggle-upcoming-active-btn" 
                  data-id="${item.id}" 
                  data-active="${Boolean(item.active)}"
                  style="cursor: pointer; border: none; ${item.active ? 'background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35);' : 'background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35);'}"
                  title="Click to toggle upcoming tool active status"
                >
                  ${item.active ? '● Active' : '○ Inactive'}
                </button>
              </td>
              <td>
                <div style="display: flex; gap: 0.4rem;">
                  <a href="#/upcoming" class="btn-details" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;" title="Preview on /upcoming">Preview</a>
                  <button type="button" class="btn-details edit-upcoming-btn" data-id="${item.id}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: var(--accent-cyan);" title="Edit upcoming tool">Edit</button>
                  <button type="button" class="btn-details delete-upcoming-btn" data-id="${item.id}" data-title="${item.title}" style="font-size: 0.75rem; padding: 0.35rem 0.65rem; color: #f87171;" title="Delete upcoming tool">Delete</button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

export function bindUpcomingToolsEvents(upcomingList, root, refreshCallback) {
  // Toggle active
  document.querySelectorAll('.toggle-upcoming-active-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const currentActive = btn.dataset.active === 'true';
      const newActive = !currentActive;

      try {
        await toolsApi.adminToggleUpcomingToolActive(id, newActive);
        showToast(`Upcoming tool visibility: ${newActive ? 'Active' : 'Inactive'}`, 'success');
        if (typeof refreshCallback === 'function') refreshCallback('upcoming');
      } catch (e) {
        showToast(`Error: ${e.message}`, 'error');
      }
    };
  });

  // Edit upcoming tool
  document.querySelectorAll('.edit-upcoming-btn').forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const tool = upcomingList.find((t) => t.id === id);
      if (tool) openUpcomingToolModal(tool, root, refreshCallback);
    };
  });

  // Delete upcoming tool
  document.querySelectorAll('.delete-upcoming-btn').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const title = btn.dataset.title;
      if (confirm(`Are you sure you want to delete upcoming tool "${title}"?`)) {
        try {
          await toolsApi.adminDeleteUpcomingTool(id);
          showToast(`Deleted upcoming tool "${title}".`, 'success');
          if (typeof refreshCallback === 'function') refreshCallback('upcoming');
        } catch (e) {
          showToast(`Error deleting: ${e.message}`, 'error');
        }
      }
    };
  });

  // Search filter inside upcoming tab
  const searchInput = document.getElementById('upcoming-admin-search-input');
  if (searchInput) {
    searchInput.oninput = () => {
      const q = (searchInput.value || '').toLowerCase().trim();
      const filtered = upcomingList.filter((item) => {
        return !q || (item.title || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
      });
      const container = document.getElementById('admin-upcoming-table-container');
      const badge = document.getElementById('upcoming-admin-count-badge');
      if (badge) badge.textContent = filtered.length;
      if (container) {
        container.innerHTML = renderUpcomingToolsTableHtml(filtered);
        bindUpcomingToolsEvents(filtered, root, refreshCallback);
      }
    };
  }

  // Add Button in Upcoming tab
  const addBtn = document.getElementById('admin-add-upcoming-btn');
  if (addBtn) {
    addBtn.onclick = () => openUpcomingToolModal(null, root, refreshCallback);
  }
}

export function openUpcomingToolModal(tool = null, root, refreshCallback) {
  const isEdit = Boolean(tool);
  const targetTool = tool || {
    id: '',
    title: '',
    slug: '',
    image: '',
    description: '',
    expectedDate: 'Coming Soon',
    badge: '🚀 UPCOMING',
    active: true
  };

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop auth-backdrop-fade';

  backdrop.innerHTML = `
    <div class="modal-card" style="max-width: 680px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation();">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <div>
          <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-pure); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🚀</span>
            <span>${isEdit ? 'Edit Upcoming Tool' : 'Add New Upcoming Tool'}</span>
          </h2>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.25rem 0 0 0;">
            Share updates on upcoming tools with Picture, Title, and Description.
          </p>
        </div>
        <button type="button" class="btn-modal-close" id="modal-close-upcoming-btn">✕</button>
      </div>

      <form id="upcoming-tool-editor-form">
        <!-- 1. Tool Title -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="upcoming-title" style="font-weight: 700; color: var(--text-pure);">
            Tool Title / Name *
          </label>
          <input 
            type="text" 
            id="upcoming-title" 
            class="form-input" 
            required 
            placeholder="e.g. Sora AI Studio, Claude 3.7 Pro, GPT-5" 
            value="${targetTool.title || ''}" 
            style="font-size: 1.05rem; font-weight: 700;"
          />
        </div>

        <!-- 2. Tool Picture / Banner with Live Preview & Upload -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <label class="form-label" for="upcoming-image-url" style="font-weight: 700; color: var(--text-pure); margin: 0;">
              Tool Picture / Image URL *
            </label>
            <span style="font-size: 0.75rem; color: #38bdf8;">Upload file or paste direct image link</span>
          </div>

          <div style="display: flex; gap: 0.6rem; margin-bottom: 0.6rem;">
            <input 
              type="text" 
              id="upcoming-image-url" 
              class="form-input" 
              placeholder="https://images.unsplash.com/... or paste image URL" 
              value="${targetTool.image || ''}" 
              style="flex: 1;"
            />
            <label class="btn btn-secondary" style="cursor: pointer; padding: 0.65rem 1.1rem; font-size: 0.85rem; white-space: nowrap;">
              Upload File
              <input type="file" id="upcoming-image-file" accept="image/*" style="display: none;" />
            </label>
          </div>
          <span id="upcoming-upload-status" style="font-size: 0.75rem; color: var(--accent-cyan); display: none; margin-bottom: 0.5rem;"></span>

          <!-- Preview Container -->
          <div style="padding: 0.85rem; background: rgba(0,0,0,0.4); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-pure);">Picture Preview:</span>
              <button type="button" id="upcoming-clear-img-btn" class="btn-details" style="color: #f87171; font-size: 0.75rem; display: ${targetTool.image ? 'inline-block' : 'none'};">Clear</button>
            </div>
            <div id="upcoming-preview-box" style="width: 100%; height: 160px; border-radius: 10px; overflow: hidden; background: #080e1a; position: relative; display: flex; align-items: center; justify-content: center;">
              <img 
                id="upcoming-img-preview" 
                src="${targetTool.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}" 
                alt="Preview" 
                style="width: 100%; height: 100%; object-fit: cover; opacity: ${targetTool.image ? '1' : '0.4'};" 
              />
              <div style="position: absolute; bottom: 8px; left: 8px;" class="badge" id="upcoming-preview-badge">
                ${targetTool.badge || '🚀 UPCOMING'}
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Tool Description -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="upcoming-description" style="font-weight: 700; color: var(--text-pure);">
            Tool Description *
          </label>
          <textarea 
            id="upcoming-description" 
            class="form-textarea" 
            rows="4" 
            required 
            placeholder="Write a clear, compelling description of what this upcoming AI tool does, its key features, and why users should get excited..."
            style="line-height: 1.6;"
          >${targetTool.description || ''}</textarea>
        </div>

        <!-- 4. Status Badge & Launch Timing -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label" for="upcoming-expected-date">Expected Launch Status</label>
            <input 
              type="text" 
              id="upcoming-expected-date" 
              class="form-input" 
              value="${targetTool.expectedDate || 'Coming Soon'}" 
              placeholder="e.g. Coming Next Month, In Beta Testing"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="upcoming-badge">Badge Label</label>
            <input 
              type="text" 
              id="upcoming-badge" 
              class="form-input" 
              value="${targetTool.badge || '🚀 UPCOMING'}" 
              placeholder="e.g. 🚀 UPCOMING, ✦ IN BETA"
            />
          </div>
        </div>

        <!-- 5. Visibility Checkbox -->
        <div class="form-group" style="margin-bottom: 1.5rem; background: rgba(255,255,255,0.03); padding: 0.85rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="upcoming-active" ${targetTool.active !== false ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-cyan);" />
            <div>
              <span style="font-weight: 700; color: var(--text-pure); font-size: 0.92rem;">Active &amp; Published on Storefront</span>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--text-muted);">
                When checked, this upcoming tool is instantly visible on the public Upcoming Tools showcase page.
              </p>
            </div>
          </label>
        </div>

        <!-- Submit & Actions -->
        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          <button type="button" class="btn btn-secondary" id="modal-cancel-upcoming-btn">Cancel</button>
          <button type="submit" class="btn btn-primary" id="upcoming-submit-btn" style="background: linear-gradient(135deg, #0284c7, #38bdf8); border: none; font-weight: 700; padding: 0.75rem 1.6rem;">
            ${isEdit ? 'Save Changes' : 'Publish Upcoming Tool'}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(backdrop);

  const closeModal = () => {
    backdrop.classList.add('auth-backdrop-out');
    setTimeout(() => backdrop.remove(), 250);
  };

  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };
  document.getElementById('modal-close-upcoming-btn').onclick = closeModal;
  document.getElementById('modal-cancel-upcoming-btn').onclick = closeModal;

  // Image preview live sync
  const imgInput = document.getElementById('upcoming-image-url');
  const previewImg = document.getElementById('upcoming-img-preview');
  const clearImgBtn = document.getElementById('upcoming-clear-img-btn');
  const fileInput = document.getElementById('upcoming-image-file');
  const uploadStatus = document.getElementById('upcoming-upload-status');
  const badgeInput = document.getElementById('upcoming-badge');
  const previewBadge = document.getElementById('upcoming-preview-badge');

  if (badgeInput && previewBadge) {
    badgeInput.oninput = () => {
      previewBadge.textContent = badgeInput.value || '🚀 UPCOMING';
    };
  }

  const updatePreview = (url) => {
    if (previewImg) {
      previewImg.src = url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
      previewImg.style.opacity = url ? '1' : '0.4';
    }
    if (clearImgBtn) clearImgBtn.style.display = url ? 'inline-block' : 'none';
  };

  if (imgInput) {
    imgInput.oninput = () => updatePreview(imgInput.value.trim());
  }

  if (clearImgBtn) {
    clearImgBtn.onclick = () => {
      imgInput.value = '';
      updatePreview('');
    };
  }

  if (fileInput) {
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      uploadStatus.textContent = 'Uploading image...';
      uploadStatus.style.display = 'block';

      try {
        const publicUrl = await uploadToolImage(file, 'logos');
        imgInput.value = publicUrl;
        updatePreview(publicUrl);
        uploadStatus.textContent = '✓ Image uploaded successfully!';
        uploadStatus.style.color = 'var(--accent-mint)';
      } catch (err) {
        uploadStatus.textContent = `Upload failed: ${err.message}`;
        uploadStatus.style.color = '#f87171';
      }
    };
  }

  // Form submission
  const form = document.getElementById('upcoming-tool-editor-form');
  const submitBtn = document.getElementById('upcoming-submit-btn');

  form.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;

    const payload = {
      id: targetTool.id,
      title: document.getElementById('upcoming-title').value.trim(),
      image: document.getElementById('upcoming-image-url').value.trim(),
      description: document.getElementById('upcoming-description').value.trim(),
      expectedDate: document.getElementById('upcoming-expected-date').value.trim() || 'Coming Soon',
      badge: document.getElementById('upcoming-badge').value.trim() || '🚀 UPCOMING',
      active: document.getElementById('upcoming-active').checked
    };

    try {
      await toolsApi.adminSaveUpcomingTool(payload);
      showToast(`Upcoming tool "${payload.title}" saved successfully!`, 'success');
      closeModal();
      if (typeof refreshCallback === 'function') refreshCallback('upcoming');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
      submitBtn.textContent = isEdit ? 'Save Changes' : 'Publish Upcoming Tool';
      submitBtn.disabled = false;
    }
  };
}

// ============================================================================
// 2. DISCOUNTS & OFFERS MANAGER
// ============================================================================

export function renderDiscountsManagerHtml(tools, hotDeals, appSettings, targetCountry = 'Pakistan') {
  const isGlobalActive = appSettings.globalDiscountActive === true;
  const globalPercent = appSettings.globalDiscountPercent || 0;

  return `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- 1. GLOBAL STOREWIDE DISCOUNT CARD -->
      <div class="admin-table-card" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1.5px solid rgba(239, 68, 68, 0.4); box-shadow: 0 10px 30px -10px rgba(239, 68, 68, 0.3);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.35rem;">
              <span style="font-size: 1.5rem;">🌐</span>
              <h3 style="font-size: 1.35rem; color: var(--text-pure); font-weight: 800; margin: 0;">
                Global Storewide Sale Discount
              </h3>
              <span class="badge" id="global-discount-status-badge" style="${isGlobalActive ? 'background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-weight: 800;' : 'background: rgba(148, 163, 184, 0.2); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.35);'}">
                ${isGlobalActive ? `● LIVE: ${globalPercent}% OFF ON ALL PRODUCTS` : '○ Inactive'}
              </span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
              Apply a universal percentage off to ALL products in the store with one click. When active, all tool cards, details pages, and deals show the discount badge and recalculated price!
            </p>
          </div>
        </div>

        <form id="global-discount-form" style="display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center; background: rgba(0,0,0,0.35); padding: 1.25rem; border-radius: 14px; border: 1px dashed rgba(239, 68, 68, 0.35);">
          <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="global-discount-toggle" ${isGlobalActive ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: #ef4444;" />
            <span style="font-weight: 800; color: var(--text-pure); font-size: 0.98rem;">Enable Global Storewide Discount</span>
          </label>

          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <label for="global-discount-val" style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">Storewide Discount %:</label>
            <input 
              type="number" 
              id="global-discount-val" 
              min="0" 
              max="100" 
              value="${globalPercent || 20}" 
              style="width: 100px; padding: 0.55rem 0.85rem; border-radius: 8px; background: #070d18; border: 1.5px solid rgba(239, 68, 68, 0.6); color: #f87171; font-weight: 800; font-size: 1.1rem; outline: none; text-align: center;" 
            />
            <span style="font-weight: 800; color: #f87171; font-size: 1.1rem;">% OFF</span>
          </div>

          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="10">10%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="20">20%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="30">30%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="50">50%</button>
            <button type="button" class="quick-amount-chip preset-global-chip" data-val="70">70%</button>
          </div>

          <div style="display: flex; gap: 0.6rem; align-items: center; margin-left: auto; flex-wrap: wrap;">
            <button type="submit" id="btn-save-global-discount" class="btn btn-primary" style="background: linear-gradient(135deg, #ef4444, #f97316); border: none; padding: 0.7rem 1.6rem; font-weight: 800; box-shadow: 0 0 20px rgba(239, 68, 68, 0.45);">
              ⚡ Apply &amp; Save to ALL Tools
            </button>
            <button type="button" id="btn-reset-all-discounts" class="btn btn-secondary" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5; padding: 0.7rem 1.15rem; font-weight: 700;">
              Reset All (0%)
            </button>
          </div>
        </form>
      </div>

      <!-- 2. INDIVIDUAL PRODUCTS DISCOUNT MANAGER -->
      <div class="admin-table-card">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <h3 style="font-size: 1.2rem; color: var(--text-pure); font-weight: 800; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>🎯</span> Individual Product Discount Manager
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.25rem;">
              Set custom % off for any specific tool or hot deal. Shows original price, discount input, and live calculated latest price for <strong>${targetCountry}</strong>.
            </p>
          </div>

          <div style="display: flex; gap: 0.6rem; align-items: center;">
            <input 
              type="text" 
              id="discount-table-search-input" 
              class="admin-search-input" 
              placeholder="Search by tool name or deal..." 
              style="max-width: 320px;" 
            />
          </div>
        </div>

        <div id="discounts-table-container">
          ${renderDiscountsTableRows(tools, hotDeals, targetCountry, appSettings)}
        </div>
      </div>
    </div>
  `;
}

export function renderDiscountsTableRows(tools, hotDeals, targetCountry = 'Pakistan', appSettings = null, filterQuery = '') {
  const settings = appSettings || getAppSettings();
  const globalActive = settings.globalDiscountActive === true;
  const globalPercent = settings.globalDiscountPercent || 0;

  // Combine tools and deals
  const combined = [
    ...tools.map((t) => ({ ...t, _itemType: 'tool' })),
    ...hotDeals.map((d) => ({ ...d, _itemType: 'deal' }))
  ];

  const q = filterQuery.toLowerCase().trim();
  const filtered = combined.filter((item) => {
    if (!q) return true;
    const name = (item.name || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    return name.includes(q) || cat.includes(q);
  });

  if (filtered.length === 0) {
    return `
      <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
        No products match your search query.
      </div>
    `;
  }

  return `
    <table class="admin-table">
      <thead>
        <tr>
          <th style="width: 50px;">Type</th>
          <th>Product Name</th>
          <th>Regular Price (${targetCountry})</th>
          <th>Custom Discount (% OFF)</th>
          <th>Effective Status</th>
          <th>Calculated Latest Price</th>
          <th style="width: 140px;">Action</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((item) => {
          const discountInfo = calculateToolDiscountPrice(item, targetCountry);
          const rawDiscount = item.discountPercent || 0;

          return `
            <tr data-id="${item.id}" data-type="${item._itemType}">
              <td>
                <span class="badge" style="${item._itemType === 'tool' ? 'background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.68rem;' : 'background: rgba(249, 115, 22, 0.2); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.4); font-size: 0.68rem;'}">
                  ${item._itemType === 'tool' ? 'Tool' : '🔥 Deal'}
                </span>
              </td>
              <td>
                <div style="display: flex; flex-direction: column;">
                  <strong style="color: var(--text-pure); font-size: 0.92rem;">${item.name}</strong>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">${item.category || 'AI Tool'}</span>
                </div>
              </td>
              <td>
                <span style="font-size: 0.88rem; color: var(--text-secondary); font-family: var(--font-mono);">
                  ${discountInfo.originalPrice}
                </span>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <input 
                    type="number" 
                    class="discount-item-input" 
                    data-id="${item.id}" 
                    data-type="${item._itemType}"
                    min="0" 
                    max="100" 
                    value="${rawDiscount}" 
                    style="width: 75px; padding: 0.35rem 0.5rem; border-radius: 6px; background: #070d18; border: 1px solid ${rawDiscount > 0 ? '#ef4444' : 'rgba(255,255,255,0.15)'}; color: ${rawDiscount > 0 ? '#f87171' : 'var(--text-pure)'}; font-weight: 700; text-align: center;" 
                  />
                  <span style="font-size: 0.82rem; font-weight: 700; color: #f87171;">%</span>
                </div>
              </td>
              <td>
                ${rawDiscount > 0 ? `
                  <span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 0.72rem; font-weight: 800;">
                    🔥 ${rawDiscount}% OFF (Item)
                  </span>
                ` : globalActive && globalPercent > 0 ? `
                  <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.72rem;">
                    🌐 ${globalPercent}% OFF (Global)
                  </span>
                ` : `
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Normal Price</span>
                `}
              </td>
              <td>
                <div>
                  <strong style="color: ${discountInfo.hasDiscount ? '#38bdf8' : 'var(--text-pure)'}; font-size: 0.95rem;">
                    ${discountInfo.discountedPrice}
                  </strong>
                  ${discountInfo.hasDiscount ? `
                    <div style="font-size: 0.72rem; color: var(--text-muted); text-decoration: line-through;">
                      ${discountInfo.originalPrice}
                    </div>
                  ` : ''}
                </div>
              </td>
              <td>
                <div style="display: flex; gap: 0.35rem;">
                  <button 
                    type="button" 
                    class="btn-details btn-save-item-discount" 
                    data-id="${item.id}" 
                    data-type="${item._itemType}" 
                    style="font-size: 0.75rem; padding: 0.3rem 0.65rem; color: var(--accent-cyan); font-weight: 700;"
                    title="Save discount percentage for this product"
                  >
                    Save
                  </button>
                  ${rawDiscount > 0 ? `
                    <button 
                      type="button" 
                      class="btn-details btn-clear-item-discount" 
                      data-id="${item.id}" 
                      data-type="${item._itemType}" 
                      style="font-size: 0.75rem; padding: 0.3rem 0.55rem; color: #f87171;"
                      title="Reset discount to 0%"
                    >
                      Clear
                    </button>
                  ` : ''}
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

export function bindDiscountsManagerEvents(tools, hotDeals, root, targetCountry = 'Pakistan', refreshCallback) {
  const globalToggle = document.getElementById('global-discount-toggle');
  const valInput = document.getElementById('global-discount-val');
  const globalForm = document.getElementById('global-discount-form');
  const saveBtn = document.getElementById('btn-save-global-discount');
  const resetBtn = document.getElementById('btn-reset-all-discounts');

  // Auto-enable toggle when user enters a positive number
  if (valInput) {
    valInput.addEventListener('input', () => {
      const val = parseInt(valInput.value, 10) || 0;
      if (globalToggle && val > 0) globalToggle.checked = true;
    });
  }

  // Preset chips for global discount
  document.querySelectorAll('.preset-global-chip').forEach((chip) => {
    chip.onclick = () => {
      if (valInput) valInput.value = chip.dataset.val;
      if (globalToggle) globalToggle.checked = true;
    };
  });

  // Global Discount Form Submit -> Applies to ALL tools in DB, Local State, and settings
  if (globalForm) {
    globalForm.onsubmit = async (e) => {
      e.preventDefault();
      const isActive = globalToggle ? globalToggle.checked : true;
      const rawVal = parseInt(valInput ? valInput.value : 0, 10) || 0;
      const percentVal = isActive ? Math.max(0, Math.min(100, rawVal)) : 0;

      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Applying to all products...';
      }

      try {
        await toolsApi.adminApplyGlobalDiscountToAllProducts(percentVal);

        // Update in-memory collections so instant re-renders reflect new values
        tools.forEach((t) => {
          t.discountPercent = percentVal;
          t.discount_percent = percentVal;
        });
        hotDeals.forEach((d) => {
          d.discountPercent = percentVal;
          d.discount_percent = percentVal;
        });

        // Update global settings
        saveAppSettings({
          globalDiscountActive: percentVal > 0,
          globalDiscountPercent: percentVal
        });

        showToast(
          percentVal > 0
            ? `✓ Successfully applied ${percentVal}% OFF to ALL tools & deals and updated their settings!`
            : `✓ Storewide discount disabled and reset to 0%.`,
          'success'
        );

        if (typeof refreshCallback === 'function') {
          refreshCallback('discounts');
        }
      } catch (err) {
        showToast(`Failed to update products: ${err.message}`, 'error');
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.textContent = '⚡ Apply & Save to ALL Tools';
        }
      }
    };
  }

  // Reset all discounts button
  if (resetBtn) {
    resetBtn.onclick = async () => {
      if (!confirm('Are you sure you want to reset all product discounts to 0% (Regular Price)?')) return;
      resetBtn.disabled = true;
      resetBtn.textContent = 'Resetting...';

      try {
        await toolsApi.adminApplyGlobalDiscountToAllProducts(0);
        tools.forEach((t) => {
          t.discountPercent = 0;
          t.discount_percent = 0;
        });
        hotDeals.forEach((d) => {
          d.discountPercent = 0;
          d.discount_percent = 0;
        });

        saveAppSettings({
          globalDiscountActive: false,
          globalDiscountPercent: 0
        });

        if (valInput) valInput.value = 0;
        if (globalToggle) globalToggle.checked = false;

        showToast('✓ All product discounts reset to 0% (Normal prices restored).', 'info');

        if (typeof refreshCallback === 'function') {
          refreshCallback('discounts');
        }
      } catch (err) {
        showToast(`Error resetting discounts: ${err.message}`, 'error');
        resetBtn.disabled = false;
        resetBtn.textContent = 'Reset All (0%)';
      }
    };
  }

  // Search filter
  const searchInput = document.getElementById('discount-table-search-input');
  if (searchInput) {
    searchInput.oninput = () => {
      const q = searchInput.value;
      const container = document.getElementById('discounts-table-container');
      if (container) {
        container.innerHTML = renderDiscountsTableRows(tools, hotDeals, targetCountry, null, q);
        bindDiscountRowActions(tools, hotDeals, root, targetCountry, refreshCallback);
      }
    };
  }

  bindDiscountRowActions(tools, hotDeals, root, targetCountry, refreshCallback);
}

function bindDiscountRowActions(tools, hotDeals, root, targetCountry, refreshCallback) {
  // Save individual discount button
  document.querySelectorAll('.btn-save-item-discount').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const type = btn.dataset.type;
      const input = document.querySelector(`.discount-item-input[data-id="${id}"]`);
      if (!input) return;

      const discountPercent = Math.max(0, Math.min(100, parseInt(input.value, 10) || 0));
      btn.textContent = 'Saving...';

      try {
        if (type === 'tool') {
          await toolsApi.adminUpdateToolDiscount(id, discountPercent);
          const tool = tools.find((t) => t.id === id);
          if (tool) tool.discountPercent = discountPercent;
        } else {
          await toolsApi.adminUpdateDealDiscount(id, discountPercent);
          const deal = hotDeals.find((d) => d.id === id);
          if (deal) deal.discountPercent = discountPercent;
        }

        showToast(`✓ Discount updated to ${discountPercent}% OFF!`, 'success');
        if (typeof refreshCallback === 'function') refreshCallback('discounts');
      } catch (err) {
        showToast(`Error: ${err.message}`, 'error');
        btn.textContent = 'Save';
      }
    };
  });

  // Clear individual discount button
  document.querySelectorAll('.btn-clear-item-discount').forEach((btn) => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const type = btn.dataset.type;

      try {
        if (type === 'tool') {
          await toolsApi.adminUpdateToolDiscount(id, 0);
          const tool = tools.find((t) => t.id === id);
          if (tool) tool.discountPercent = 0;
        } else {
          await toolsApi.adminUpdateDealDiscount(id, 0);
          const deal = hotDeals.find((d) => d.id === id);
          if (deal) deal.discountPercent = 0;
        }

        showToast(`Reset discount to 0%.`, 'info');
        if (typeof refreshCallback === 'function') refreshCallback('discounts');
      } catch (err) {
        showToast(`Error: ${err.message}`, 'error');
      }
    };
  });
}
