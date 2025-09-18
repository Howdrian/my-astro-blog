import { defineType, defineField } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: '博客文章',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL路径',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishDate',
      title: '发布日期',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'updatedDate',
      title: '更新日期',
      type: 'datetime'
    }),
    defineField({
      name: 'tags',
      title: '标签',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'draft',
      title: '草稿',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'featured',
      title: '特色文章',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'coverImage',
      title: '封面图片',
      type: 'object',
      fields: [
        {
          name: 'src',
          title: '图片URL',
          type: 'url'
        },
        {
          name: 'alt',
          title: '图片描述',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'content',
      title: '内容',
      type: 'text',
      rows: 20,
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'coverImage.src'
    }
  }
})

export const schemaTypes = [blog]