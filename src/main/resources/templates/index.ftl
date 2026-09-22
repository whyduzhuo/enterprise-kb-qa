<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>企业知识库问答系统</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="app-container">
    <aside class="sidebar">
        <div class="logo">
            <span class="logo-icon">📚</span>
            <span class="logo-text">知识库助手</span>
        </div>
        <nav class="nav">
            <a href="/" class="nav-item active">
                <span>💬</span> 智能问答
            </a>
            <a href="/docs" class="nav-item">
                <span>📄</span> 文档管理
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="model-info">
                <div class="label">当前模型</div>
                <div class="value">Qwen3.5 + Ollama</div>
            </div>
        </div>
    </aside>
    <main class="main-content">
        <header class="chat-header">
            <h1>企业知识库智能问答</h1>
            <p class="subtitle">基于本地大模型 · 数据不出内网 · 支持 PDF / Word</p>
        </header>
        <div class="chat-messages" id="chatMessages">
            <div class="message system">
                <div class="avatar">🤖</div>
                <div class="bubble">
                    <p>您好！我是企业知识库助手。</p>
                    <p>请先在「文档管理」中上传 PDF 或 Word 文档，然后就可以向我提问了。</p>
                    <p>例如：「公司年假政策是什么？」「报销流程有哪些步骤？」</p>
                </div>
            </div>
        </div>
        <div class="chat-input-area">
            <div class="input-wrapper">
                <textarea id="questionInput" placeholder="请输入您的问题，按 Enter 发送，Shift+Enter 换行..." rows="1"></textarea>
                <button id="sendBtn" class="send-btn" title="发送">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
            <div class="input-tips">
                <span>支持流式输出 · 基于知识库内容回答</span>
                <button id="clearBtn" class="text-btn">清空对话</button>
            </div>
        </div>
    </main>
</div>
<script src="/js/chat.js"></script>
</body>
</html>
