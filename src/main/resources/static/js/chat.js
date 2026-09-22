(function () {
    const chatMessages = document.getElementById('chatMessages');
    const questionInput = document.getElementById('questionInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    let isStreaming = false;
    questionInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });
    questionInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    });
    sendBtn.addEventListener('click', sendQuestion);
    clearBtn.addEventListener('click', clearChat);
    function sendQuestion() {
        const question = questionInput.value.trim();
        if (!question || isStreaming) return;
        appendMessage('user', question);
        questionInput.value = '';
        questionInput.style.height = 'auto';
        const assistantBubble = appendMessage('assistant', '');
        const contentEl = assistantBubble.querySelector('.content');
        contentEl.innerHTML = '<span class="cursor"></span>';
        isStreaming = true;
        sendBtn.disabled = true;
        fetch('/api/chat/stream?question=' + encodeURIComponent(question), {
            method: 'GET',
            headers: { 'Accept': 'text/event-stream' }
        }).then(response => {
            if (!response.ok) throw new Error('请求失败: ' + response.status);
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let fullText = '';
            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) { finishStream(contentEl, fullText); return; }
                    buffer += decoder.decode(value, { stream: true });
                    const parts = buffer.split('\n\n');
                    buffer = parts.pop() || '';
                    for (const part of parts) {
                        const lines = part.split('\n');
                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                const data = line.slice(5).trim();
                                if (data === '[DONE]') continue;
                                fullText += data;
                                contentEl.innerHTML = escapeHtml(fullText) + '<span class="cursor"></span>';
                                scrollToBottom();
                            }
                        }
                    }
                    read();
                }).catch(err => {
                    contentEl.innerHTML = escapeHtml(fullText || '请求出错：' + err.message);
                    finishStream(contentEl, fullText);
                });
            }
            read();
        }).catch(err => {
            contentEl.textContent = '请求失败：' + err.message;
            finishStream(contentEl, '');
        });
    }
    function finishStream(contentEl, fullText) {
        contentEl.innerHTML = escapeHtml(fullText || '（无内容返回）');
        isStreaming = false;
        sendBtn.disabled = false;
        scrollToBottom();
    }
    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = 'message ' + role;
        const avatar = role === 'user' ? '👤' : '🤖';
        div.innerHTML = '<div class="avatar">' + avatar + '</div><div class="bubble"><div class="content">' + escapeHtml(text) + '</div></div>';
        chatMessages.appendChild(div);
        scrollToBottom();
        return div;
    }
    function clearChat() {
        chatMessages.innerHTML = '<div class="message system"><div class="avatar">🤖</div><div class="bubble"><p>对话已清空。请继续提问。</p></div></div>';
    }
    function scrollToBottom() { chatMessages.scrollTop = chatMessages.scrollHeight; }
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
})();
