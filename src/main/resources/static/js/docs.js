(function () {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const selectBtn = document.getElementById('selectBtn');
    const uploadList = document.getElementById('uploadList');
    selectBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
    uploadBox.addEventListener('click', () => fileInput.click());
    uploadBox.addEventListener('dragover', (e) => { e.preventDefault(); uploadBox.classList.add('dragover'); });
    uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) { handleFiles(fileInput.files); fileInput.value = ''; }
    });
    function handleFiles(fileList) { Array.from(fileList).forEach(uploadFile); }
    function uploadFile(file) {
        const item = document.createElement('div');
        item.className = 'upload-item';
        item.innerHTML = '<div class="file-icon">' + getFileIcon(file.name) + '</div><div class="file-info"><div class="file-name">' + escapeHtml(file.name) + '</div><div class="file-status">上传中...</div></div><div class="spinner"></div>';
        uploadList.prepend(item);
        const statusEl = item.querySelector('.file-status');
        const spinner = item.querySelector('.spinner');
        const formData = new FormData();
        formData.append('file', file);
        fetch('/api/kb/upload', { method: 'POST', body: formData })
            .then(res => res.json().then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
                spinner.remove();
                if (ok) {
                    statusEl.className = 'file-status success';
                    statusEl.textContent = '入库成功 · 共 ' + (data.chunks || 0) + ' 个片段';
                } else {
                    statusEl.className = 'file-status error';
                    statusEl.textContent = data.message || data.error || '上传失败';
                }
            })
            .catch(err => {
                spinner.remove();
                statusEl.className = 'file-status error';
                statusEl.textContent = '上传失败：' + err.message;
            });
    }
    function getFileIcon(name) {
        const lower = name.toLowerCase();
        if (lower.endsWith('.pdf')) return '📕';
        if (lower.endsWith('.doc') || lower.endsWith('.docx')) return '📘';
        if (lower.endsWith('.txt') || lower.endsWith('.md')) return '📄';
        return '📎';
    }
    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
})();
