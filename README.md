# crud-app

具备 CRUD（Create / Read / Update / Delete）能力的待办清单应用。

## 技术栈

React 19、Vite、React Router、Context API、react-hook-form、Zod、axios（模拟 API）

## 运行项目

```bash
npm install
npm run dev
```

应用将在 [http://localhost:8080](http://localhost:8080) 启动。

## 其他命令

```bash
npm run build    # 生产构建
npm run preview  # 预览构建结果
npm run lint     # ESLint 检查
```

## 功能

- 加载并展示任务列表（含加载与错误状态）
- 创建新任务（表单校验：标题 1–100 字符）
- 切换完成状态、行内编辑标题
- 删除任务（确认对话框）
- 按标题搜索过滤
- 创建/更新/删除成功时 Toast 提示
- localStorage 持久化（刷新后数据保留）
- 批量清除已完成任务（Clear completed）
- `react-error-boundary` 错误降级 UI
