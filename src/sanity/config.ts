import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'

export default defineConfig({
  name: 'default',
  title: '我的个人博客',
  
  projectId: 'your-project-id', // 需要替换为您的Sanity项目ID
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // 自定义文档结构
  document: {
    // 隐藏已发布的文档"Unpublish"选项
    actions: (prev, context) => {
      return prev.filter(({ action }) => action !== 'unpublish')
    }
  }
})