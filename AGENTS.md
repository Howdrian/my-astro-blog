# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` 负责声明 Astro 路由，只保留轻量页面逻辑并组合 `layouts/` 与 `components/`。
- `src/content/` 下的 `post/`、`note/`、`tag/` 使用 Content Collections，新增文稿需满足 `content.config.ts` 中的 schema 与 frontmatter 校验。
- 复用型模块按职责分布在 `src/components/`、`src/lib/`、`src/utils/`；静态资源放入 `src/assets/`（构建期处理）或 `public/`（原样输出）。
- Sanity 配置集中在 `sanity.config.ts` 与 `SANITY_SETUP.md`，通过 `src/sanity/` 与 `src/lib/` 中的查询函数供页面消费。

## Build, Test, and Development Commands
- 核心包管理统一使用 `pnpm`：先运行 `corepack enable pnpm`，再执行 `pnpm install --frozen-lockfile` 以保持 `pnpm-lock.yaml` 一致。
- `pnpm dev`：启动本地 Astro + Tailwind 开发服务器（默认端口 4321）。
- `pnpm build`：生成 `dist/`，并在 postbuild 阶段运行 Pagefind 构建搜索索引。
- `pnpm preview`：在本地验证生产构建，部署前务必检查。
- `pnpm lint` 与 `pnpm format`：分别执行 Biome 检查与 Biome+Prettier 格式化。
- `pnpm check`：调用 `astro check` 做类型与组件诊断；Sanity 相关操作使用 `pnpm sanity:*` 脚本。

## Coding Style & Naming Conventions
- Biome 规则使用 Tab 缩进、行宽 100、保留结尾分号和尾随逗号；提交前至少运行 `pnpm format`。
- TypeScript/JavaScript 组件名遵循 PascalCase，变量与函数使用 camelCase；内容集合 slug 采用 kebab-case。
- `.astro` 与 React 组件命名以职责开头（如 `PostCard.astro`、`SearchDrawer.tsx`），公共样式抽离至 `src/styles/`。
- Tailwind 类名保持语义分组，必要时使用 `clsx` 或自定义工具函数减少重复。

## Testing Guidelines
- 目前没有集成自动化测试框架；请按 `pnpm lint → pnpm check → pnpm build` 顺序执行，确保三项全部通过。
- 构建后运行 `pnpm preview`，在本地逐页检查首页、文章详情、搜索 Overlay，无 404 与控制台错误。
- 涉及 Sanity 查询或数据结构改动时，确认 `.env` 中的 `PUBLIC_SANITY_PROJECT_ID=pc4vypln`，并验证新内容能从 cms 正常读出。

## Commit & Pull Request Guidelines
- 参考现有提交约定：emoji + 类型前缀（如 `feat:`、`fix:`、`chore:`），示例：`🎨 fix: 调整卡片阴影`。
- 单次提交聚焦单一主题，将格式化与功能改动分离；避免提交 `package-lock.json` 变更。
- PR 需包含变更摘要、关联 Issue、受影响页面或功能、必要的 UI 截图以及新增/修改环境变量说明。
- 请求评审前再次运行 `pnpm lint`、`pnpm build`，确保 CI 可直接通过。

## Security & Configuration Tips
- `.env` 与部署平台中配置 `PUBLIC_SANITY_*`、`SANITY_TOKEN` 等敏感变量；仓库仅存 `.env.example`。
- 部署至 Vercel 时确认构建命令 `pnpm build`、输出目录 `dist/` 与 Pagefind 二进制均可用，并同步 README 中列出的必需环境变量。
