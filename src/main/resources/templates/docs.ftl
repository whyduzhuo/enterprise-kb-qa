<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文档管理 - 企业知识库问答系统</title>
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
            <a href="/" class="nav-item"><span>💬</span> 智能问答</a>
            <a href="/docs" class="nav-item active"><span>📄</span> 文档管理</a>
        </nav>
        <div class="sidebar-footer">
            <div class="model-info">
                <div class="label">当前模型</div>
                <div class="value">Qwen3.5 + Ollama</div>
            </div>
        </div>
    </aside>
    <main class="main-content docs-page">
        <header class="chat-header">
            <h1>文档管理</h1>
            <p class="subtitle">上传 PDF / Word 文档到知识库，支持批量上传</p>
        </header>
        <div class="upload-section">
            <div class="upload-box" id="uploadBox">
                <div class="upload-icon">📁</div>
                <p class="upload-text">点击或拖拽文件到此处上传</p>
                <p class="upload-hint">支持 PDF、Word（.doc/.docx）、TXT、Markdown，单文件最大 50MB</p>
                <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.txt,.md" style="display: none;">
                <button class="primary-btn" id="selectBtn">选择文件</button>
            </div>
            <div class="upload-list" id="uploadList"></div>
        </div>
        <div class="info-cards">
            <div class="info-card"><div class="info-icon">1</div><h3>上传文档</h3><p>将企业制度、手册、技术文档等 PDF 或 Word 文件上传到系统</p></div>
            <div class="info-card"><div class="info-icon">2</div><h3>自动解析入库</h3><p>系统自动分块、向量化并存入知识库，无需人工干预</p></div>
            <div class="info-card"><div class="info-icon">3</div><h3>智能问答</h3><p>返回「智能问答」页面，即可基于上传的文档进行提问</p></div>
        </div>
        <div class="notice"><strong>提示：</strong>向量数据已持久化到 PostgreSQL（PgVector）。服务重启后知识库数据仍然保留。</div>
    </main>
</div>
<script src="/js/docs.js"></script>
</body>
</html>
