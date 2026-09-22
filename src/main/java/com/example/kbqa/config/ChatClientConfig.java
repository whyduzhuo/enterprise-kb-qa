package com.example.kbqa.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient chatClient(ChatClient.Builder builder, VectorStore vectorStore) {
        return builder
                .defaultSystem("""
                        你是企业知识库智能助手。
                        请严格基于提供的「参考资料」回答用户问题。
                        如果参考资料中没有相关信息，请明确回复：「根据现有知识库内容，无法回答该问题。」
                        回答要求：
                        - 使用中文
                        - 简洁、准确、专业
                        - 尽量引用资料中的关键原文或数据
                        - 不要编造知识库中不存在的信息
                        """)
                .defaultAdvisors(
                        QuestionAnswerAdvisor.builder(vectorStore)
                                .searchRequest(SearchRequest.builder()
                                        .topK(5)
                                        .similarityThreshold(0.55)
                                        .build())
                                .build())
                .build();
    }
}
