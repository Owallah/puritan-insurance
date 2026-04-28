// service.ts
import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "service",
  title: "Insurance Service",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Liability Covers", value: "liability" },
          { title: "Property Insurance", value: "property" },
          { title: "People Insurance", value: "people" },
          { title: "Personal Lines", value: "personal" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "string",
    }),
    defineField({
      name: "popular",
      title: "Featured / Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "premiumOptions",
      title: "Premium Options",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "premiumOption",
          title: "Premium Option",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "amount",
              title: "Amount (KES)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "period",
              title: "Period",
              type: "string",
              options: {
                list: [
                  { title: "Monthly", value: "monthly" },
                  { title: "Quarterly", value: "quarterly" },
                  { title: "Semi-annually", value: "semi-annually" },
                  { title: "Annually", value: "annually" },
                  { title: "One-time", value: "one-time" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "amount" },
            // ✅ Use Record<string, any> to match Sanity's expected signature
            prepare(value: Record<string, any>) {
              return {
                title: value.title,
                subtitle: value.subtitle
                  ? `KES ${(value.subtitle as number).toLocaleString()}`
                  : "Quote only",
              };
            },
          },
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: "Category A–Z",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
    {
      title: "Title A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "category", popular: "popular" },
    // ✅ This is the key fix — use Record<string, any> instead of a strict typed object
    prepare(value: Record<string, any>) {
      return {
        title: `${value.popular ? "⭐ " : ""}${value.title}`,
        subtitle: value.subtitle
          ? value.subtitle.charAt(0).toUpperCase() + value.subtitle.slice(1)
          : "",
      };
    },
  },
});
