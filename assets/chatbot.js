// Minimal client-side OpenAI chat for demo purposes.
// WARNING: Entering an API key in the browser exposes it to this page context.
// Prefer proxying through your server for production.

(function(){
  const $ = (sel) => document.querySelector(sel);
  const apiKeyInput = $('#apiKey');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');
  const chatMessages = $('#chatMessages');
  const chatMode = $('#chatMode');

  if (!apiKeyInput || !chatForm || !chatInput || !chatMessages || !chatMode) return;

  // Load stored key
  try {
    const saved = localStorage.getItem('openai_api_key') || '';
    if (saved) apiKeyInput.value = saved;
  } catch {}

  apiKeyInput?.addEventListener('change', () => {
    try { localStorage.setItem('openai_api_key', apiKeyInput.value || ''); } catch {}
  });

  function addMsg(role, text){
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + (role === 'user' ? 'msg-user' : 'msg-assistant');
    const b = document.createElement('div');
    b.className = 'msg-bubble';
    b.textContent = text;
    wrap.appendChild(b);
    chatMessages.appendChild(wrap);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  const SYSTEM_TRAVEL = 'You are a concise, friendly travel planner for GlobeTrek. Ask clarifying questions, propose 2–3 succinct options with budget hints, and keep answers brief and skimmable.';
  const SYSTEM_RESTAURANT = 'You are a concise, friendly restaurant menu planner for Le Gourmet. Ask about dietary preferences, suggest balanced menus with prices, and keep answers short and skimmable.';

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const key = (apiKeyInput.value || '').trim();
    const userText = (chatInput.value || '').trim();
    if (!userText) return;
    if (!key){ addMsg('assistant','Please enter your OpenAI API key first.'); return; }
    addMsg('user', userText);
    chatInput.value = '';

    const system = chatMode.value === 'restaurant' ? SYSTEM_RESTAURANT : SYSTEM_TRAVEL;
    try{
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.6,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: userText }
          ]
        })
      });
      if (!res.ok){
        const msg = res.status === 401 ? 'Unauthorized: check your API key.' : 'API error: ' + res.status;
        addMsg('assistant', msg);
        return;
      }
      const data = await res.json();
      const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || 'No response';
      addMsg('assistant', text.trim());
    } catch(err){
      addMsg('assistant', 'Network error. Please try again.');
    }
  });
})();

