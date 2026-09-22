package com.example.kbqa.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class KnowledgeBaseService {

    private final VectorStore vectorStore;
    private final TokenTextSplitter textSplitter;

    public KnowledgeBaseService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
        this.textSplitter = TokenTextSplitter.builder()
                .withChunkSize(800)
                .withMinChunkSizeChars(350)
                .withKeepSeparator(true)
                .build();
    }

    public Map<String, Object> ingestDocument(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("文件不能为空");
        }
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("无法获取文件名");
        }
        String lower = filename.toLowerCase();
        if (!(lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx")
                || lower.endsWith(".txt") || lower.endsWith(".md"))) {
            throw new IllegalArgumentException("仅支持 PDF、Word、TXT、Markdown 文件");
        }
        try {
            Resource resource = file.getResource();
            TikaDocumentReader reader = new TikaDocumentReader(resource);
            List<Document> documents = reader.get();
            List<Document> withSource = documents.stream()
                    .map(doc -> doc.mutate()
                            .metadata("source", filename)
                            .metadata("filename", filename)
                            .build())
                    .toList();
            List<Document> chunks = textSplitter.apply(withSource);
            vectorStore.add(chunks);
            return Map.of(
                    "filename", filename,
                    "originalDocuments", withSource.size(),
                    "chunks", chunks.size(),
                    "message", "文档入库成功"
            );
        } catch (Exception e) {
            throw new RuntimeException("文档解析或入库失败: " + e.getMessage(), e);
        }
    }

    public List<Map<String, Object>> ingestDocuments(MultipartFile[] files) {
        return java.util.Arrays.stream(files).map(this::ingestDocument).toList();
    }
}
