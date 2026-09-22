# 企业知识库问答系统（Spring AI 2.0 + Ollama + Qwen3.5 + SSE + PgVector）

基于 **Spring AI 2.0.1** / **Spring Boot 4.1** 实现的本地企业知识库问答系统，支持：

- 本地大模型：Ollama + **Qwen3.5**
- 文档入库：PDF / Word（.doc/.docx）/ TXT / Markdown
- RAG 检索增强生成（`QuestionAnswerAdvisor`）
- **SSE 流式输出**
- **PostgreSQL + PgVector** 持久化向量存储

参考官方仓库：[spring-projects/spring-ai](https://github.com/spring-projects/spring-ai)

---

## 一、环境准备

### 0. PostgreSQL + pgvector 扩展（必须）

确保 PostgreSQL 已安装并启用 **pgvector** 扩展。

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

当前连接配置（可在 `application.yml` 修改）：

| 项 | 值 |
|----|-----|
| 地址 | localhost:5432 |
| 数据库 | postgres |
| 用户名 | postgres |
| 密码 | root |

### 1. 安装 Ollama 并拉取模型

```bash
ollama pull qwen3.5:9b
ollama pull nomic-embed-text
```

### 2. JDK 与 Maven

- JDK 21+
- Maven 3.9+
- Spring Boot **4.1.1**
- Spring AI **2.0.1**

---

## 二、启动项目

```bash
cd enterprise-kb-qa
mvn clean spring-boot:run
```

- 智能问答：http://localhost:8080
- 文档管理：http://localhost:8080/docs
