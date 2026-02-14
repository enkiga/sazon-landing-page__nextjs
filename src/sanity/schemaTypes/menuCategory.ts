import { defineField, defineType } from "sanity";
import {
  buildImageValidation,
  IMAGE_RULES,
  SLUGIFY,
  slugFormatValidation,
} from "./validationHelpers";

export default defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Category name shown in the menu (e.g. Starters, Drinks).",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(60)
          .error(
            "Menu category title is required and should be 2-60 characters.",
          ),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short plain-language explanation of this category.",
      validation: (Rule) =>
        Rule.max(280).error("Description must be 280 characters or less."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL-friendly text used in links. It auto-fills from the title and you can edit it.",
      options: {
        source: "title",
        slugify: SLUGIFY,
        maxLength: 96,
      },
      validation: slugFormatValidation("Menu category slug"),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Smaller number appears first in lists.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error("Sort order is required and must be 0 or higher."),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "boolean",
      description: "Turn on when customers can order items in this category.",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Representative image for this menu category.",
      options: {
        hotspot: true,
        accept: "image/jpeg,image/png,image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the category image for accessibility and SEO.",
          validation: (Rule) =>
            Rule.required()
              .min(8)
              .max(140)
              .error("Category image alt text is required (8-140 characters)."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional short text shown under this image.",
          validation: (Rule) =>
            Rule.max(180).error("Caption must be 180 characters or less."),
        }),
      ],
      validation: buildImageValidation({
        ...IMAGE_RULES.menu,
        fieldLabel: "Category image",
      }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        media: media,
      };
    },
  },
});
