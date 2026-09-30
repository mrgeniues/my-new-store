// AI Tools Store - Floating AI Agent Chatbot Widget
// Connects to n8n AI Agent Webhook (with RAG Vector Store)
// Controlled by Admin Panel Toggle (Show / Hide) and Webhook URL setting

import { getAppSettings } from '../lib/settings.js';
import { sendAiAgentMessage } from '../lib/settings.js';
import { defaultWhatsappUrl } from '../lib/supabase.js';

let isChatOpen = false;
let chatMessages = [];
let isAiResponding = false;
let userSessionId = '';

function getSessionId() {
  if (!userSessionId) {
    try {
      userSessionId = sessionStorage.getItem('ai_tools_chat_session') || '';
      if (!userSessionId) {
        userSessionId = 'sess_' + Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem('ai_tools_chat_session', userSessionId);
      }
    } catch (e) {
      userSessionId = 'guest_' + Date.now();
    }
  }
  return userSessionId;
}

/**
 * Initializes and mounts the Floating AI Chat Widget to DOM
 */
export function initAiChatWidget() {
  let container = document.getElementById('ai-chat-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ai-chat-root';
    document.body.appendChild(container);
  }

  // Load initial welcome message if empty
  if (chatMessages.length === 0) {
    chatMessages.push({
      sender: 'ai',
      text: 'Hello! 👋 I am your **AI Store Assistant**.\n\nI can help you check **tool pricing**, explain our **store policies** (Fixed Pricing, Refund & Activation), or find the best **Hot Deals**. How can I help you today?',
      time: formatTime(new Date())
    });
  }

  renderWidget();

  // Re-render when admin changes settings (toggle on/off or updates webhook URL)
  window.addEventListener('ai_tools_settings_changed', () => {
    renderWidget();
  });
}

function renderWidget() {
  const container = document.getElementById('ai-chat-root');
  if (!container) return;

  const settings = getAppSettings();
  const isEnabled = settings.aiAgentEnabled !== false;

  // If disabled by Admin, hide completely
  if (!isEnabled) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <!-- Floating Trigger Button (Bottom Right) -->
    <button 
      type="button" 
      id="ai-chat-floating-btn" 
      class="ai-chat-floating-btn ${isChatOpen ? 'active' : ''}" 
      aria-label="Open AI Support Assistant"
      title="Chat with AI Assistant"
    >
      <div class="ai-chat-btn-pulse"></div>
      <div class="ai-chat-btn-icon">
        ${isChatOpen ? `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ` : `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `}
      </div>
      <span class="ai-chat-btn-label">AI Assistant</span>
      <span class="ai-chat-online-dot"></span>
    </button>

    <!-- Slide-in Chat Drawer / Panel (Right Side) -->
    <div id="ai-chat-panel" class="ai-chat-panel ${isChatOpen ? 'open' : ''}" role="dialog" aria-modal="true">
      <!-- Header -->
      <div class="ai-chat-header">
        <div class="ai-chat-header-info">
          <div class="ai-avatar-circle">
            🤖
            <span class="avatar-live-indicator"></span>
          </div>
          <div>
            <div class="ai-chat-title">
              <span>AI Support Concierge</span>
              <span class="ai-chat-chip-badge">n8n RAG</span>
            </div>
            <div class="ai-chat-status">
              ● Online • Instant Knowledge Base
            </div>
          </div>
        </div>

        <div class="ai-chat-header-actions">
          <button type="button" id="ai-chat-clear-btn" class="ai-chat-tool-btn" title="Clear Chat History">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
          <button type="button" id="ai-chat-close-btn" class="ai-chat-tool-btn" title="Close Chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <!-- Quick Suggestion Chips Bar -->
      <div class="ai-chat-suggestions">
        <button type="button" class="ai-suggest-pill" data-query="What is your fixed pricing policy?">
          🏷️ Pricing Policy
        </button>
        <button type="button" class="ai-suggest-pill" data-query="How does the refund and replacement policy work?">
          🔄 Refund Policy
        </button>
        <button type="button" class="ai-suggest-pill" data-query="How to activate my account using the reference video?">
          🎥 Activation Guide
        </button>
        <button type="button" class="ai-suggest-pill" data-query="Show me the latest Hot Deals and bundle discounts">
          🔥 Hot Deals
        </button>
        <button type="button" class="ai-suggest-pill" data-query="How can I connect with human WhatsApp support?">
          💬 WhatsApp
        </button>
      </div>

      <!-- Messages Stream -->
      <div class="ai-chat-messages" id="ai-chat-messages-container">
        ${renderMessagesHtml()}
        ${isAiResponding ? `
          <div class="ai-msg-bubble ai-msg-bot typing-bubble">
            <div class="ai-typing-indicator">
              <span></span><span></span><span></span>
            </div>
            <span style="font-size: 0.72rem; color: var(--text-muted); margin-left: 0.4rem;">Searching knowledge base...</span>
          </div>
        ` : ''}
      </div>

      <!-- Input Footer -->
      <div class="ai-chat-footer">
        <form id="ai-chat-form" class="ai-chat-form">
          <input 
            type="text" 
            id="ai-chat-input" 
            class="ai-chat-input" 
            placeholder="Ask about tools, prices, or policies..." 
            autocomplete="off"
            ${isAiResponding ? 'disabled' : ''}
          />
          <button 
            type="submit" 
            id="ai-chat-send-btn" 
            class="ai-chat-send-btn" 
            aria-label="Send Message"
            ${isAiResponding ? 'disabled' : ''}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <div class="ai-chat-footer-note">
          Powered by n8n RAG Agent &bull; Instant Verified Answers
        </div>
      </div>
    </div>
  `;

  bindWidgetEvents();
  scrollToBottom();
}

function renderMessagesHtml() {
  return chatMessages.map((msg) => {
    const isBot = msg.sender === 'ai';
    return `
      <div class="ai-msg-bubble ${isBot ? 'ai-msg-bot' : 'ai-msg-user'}">
        <div class="ai-msg-content">${formatMessageText(msg.text)}</div>
        <div class="ai-msg-time">${msg.time}</div>
      </div>
    `;
  }).join('');
}

function formatMessageText(text = '') {
  // Simple clean markdown parser for bold, links, line breaks, and bullet points
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|#\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="ai-chat-link">$1</a>');

  // Bullet points
  html = html.replace(/^[•\-\*]\s+(.+)$/gm, '<div class="ai-chat-bullet">• $1</div>');

  // Newlines
  html = html.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');

  return html;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
  setTimeout(() => {
    const container = document.getElementById('ai-chat-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, 50);
}

function bindWidgetEvents() {
  const floatingBtn = document.getElementById('ai-chat-floating-btn');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const clearBtn = document.getElementById('ai-chat-clear-btn');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const suggestions = document.querySelectorAll('.ai-suggest-pill');

  if (floatingBtn) {
    floatingBtn.onclick = () => {
      isChatOpen = !isChatOpen;
      renderWidget();
      if (isChatOpen && input) {
        setTimeout(() => input.focus(), 150);
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      isChatOpen = false;
      renderWidget();
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      chatMessages = [{
        sender: 'ai',
        text: 'Chat history cleared. How can I assist you with our AI tools, policies, or pricing today?',
        time: formatTime(new Date())
      }];
      renderWidget();
    };
  }

  if (suggestions) {
    suggestions.forEach((btn) => {
      btn.onclick = () => {
        const query = btn.getAttribute('data-query');
        if (query) {
          handleSendMessage(query);
        }
      };
    });
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const text = (input?.value || '').trim();
      if (!text || isAiResponding) return;
      input.value = '';
      handleSendMessage(text);
    };
  }
}

async function handleSendMessage(userText) {
  const settings = getAppSettings();
  const webhookUrl = settings.aiAgentWebhookUrl || '';

  // Append user message
  chatMessages.push({
    sender: 'user',
    text: userText,
    time: formatTime(new Date())
  });

  isAiResponding = true;
  renderWidget();

  try {
    // Check if webhook is configured
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      await new Promise((r) => setTimeout(r, 600));
      chatMessages.push({
        sender: 'ai',
        text: `⚠️ **n8n AI Agent Webhook is not connected yet.**\n\nPlease add your active n8n Webhook URL in the **Admin Panel &rarr; Store Settings &rarr; AI Chat Agent Mode**.\n\nIn the meantime, you can review our official [Store Policies](#/policy) or connect directly with our [WhatsApp Concierge](${defaultWhatsappUrl}).`,
        time: formatTime(new Date())
      });
    } else {
      const sessionId = getSessionId();
      const res = await sendAiAgentMessage({
        webhookUrl,
        message: userText,
        sessionId
      });

      const reply = res.responseText || (res.success ? 'Message processed.' : 'Unable to get response from AI Agent.');
      chatMessages.push({
        sender: 'ai',
        text: reply,
        time: formatTime(new Date())
      });
    }
  } catch (err) {
    chatMessages.push({
      sender: 'ai',
      text: `Error connecting to AI agent: ${err.message}`,
      time: formatTime(new Date())
    });
  } finally {
    isAiResponding = false;
    renderWidget();
  }
}
