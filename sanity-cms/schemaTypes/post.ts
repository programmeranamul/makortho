import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  fields: [
    // --------------------------------
    // Basic Information
    // --------------------------------

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',

      validation: (Rule) => Rule.required().min(10).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',

      options: {
        source: 'title',
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),

    // defineField({
    //   name: 'excerpt',
    //   title: 'Excerpt',
    //   type: 'text',
    //   rows: 3,

    //   description:
    //     'Short description shown on blog cards and search results.',

    //   validation: (Rule) =>
    //     Rule.required()
    //       .min(20)
    //       .max(300),
    // }),

    // --------------------------------
    // Images
    // --------------------------------

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',

          validation: (Rule) => Rule.required(),
        }),
      ],

      validation: (Rule) => Rule.required(),
    }),

    // --------------------------------
    // Article Content
    // --------------------------------

    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',

      validation: (Rule) => Rule.required(),
    }),

    // --------------------------------
    // Category
    // --------------------------------

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',

      to: [
        {
          type: 'category',
        },
      ],

      validation: (Rule) => Rule.required(),
    }),

    // --------------------------------
    // Author
    // --------------------------------

    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',

    //   to: [
    //     {
    //       type: 'doctor',
    //     },
    //   ],

    //   validation: (Rule) => Rule.required(),
    // }),

    // --------------------------------
    // Publishing
    // --------------------------------

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post in the featured section.',
      initialValue: false,
    }),

    // --------------------------------
    // SEO
    // --------------------------------

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',

      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',

          description: 'Recommended length: around 50–60 characters.',

          validation: (Rule) => Rule.max(60),
        }),

        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,

          description: 'Recommended length: around 150–160 characters.',

          validation: (Rule) => Rule.max(160),
        }),

        defineField({
          name: 'ogImage',
          title: 'Social Sharing Image',
          type: 'image',

          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category.name',
      publishedAt: 'publishedAt',
    },

    prepare(selection) {
      const {title, media, category, publishedAt} = selection

      return {
        title,
        media,
        subtitle: `${category || 'No category'}${
          publishedAt ? ` • ${new Date(publishedAt).toLocaleDateString()}` : ''
        }`,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
      ],
    },

    {
      title: 'Published Date (Oldest)',
      name: 'publishedAtAsc',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
      ],
    },
  ],
})
