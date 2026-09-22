package com.example.kbqa.controller;

import com.example.kbqa.service.KnowledgeBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kb")
public class KnowledgeBaseController {

    private final KnowledgeBaseService knowledgeBaseService;

    public KnowledgeBaseController(KnowledgeBaseService knowledgeBaseService) {
        this.knowledgeBaseService = knowledgeBaseService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(knowledgeBaseService.ingestDocument(file));
    }

    @PostMapping("/upload/batch")
    public ResponseEntity<List<Map<String, Object>>> uploadBatch(@RequestParam("files") MultipartFile[] files) {
        return ResponseEntity.ok(knowledgeBaseService.ingestDocuments(files));
    }
}
