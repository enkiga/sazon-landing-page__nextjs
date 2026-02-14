import { defineField, defineType } from "sanity";
import {
  buildImageValidation,
  IMAGE_RULES,
  SLUGIFY,
  slugFormatValidation,
} from "./validationHelpers";

export default defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the dish or drink customers will see.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Menu item name is required and should be 2-80 characters."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Simple description to help customers decide quickly.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .error("Description is required and should be 10-500 characters."),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Current price in your default currency.",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .precision(2)
          .error("Menu item price is required and cannot be negative."),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "menuCategory" }],
      description: "Pick which menu category this item belongs to.",
      validation: (Rule) =>
        Rule.required().error("Menu Item Category is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Photo of this item for the menu and cards.",
      options: {
        hotspot: true,
        accept: "image/jpeg,image/png,image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describe this menu item image for accessibility and SEO.",
          validation: (Rule) =>
            Rule.required()
              .min(8)
              .max(140)
              .error("Menu image alt text is required (8-140 characters)."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional short caption for this menu item image.",
          validation: (Rule) =>
            Rule.max(180).error("Caption must be 180 characters or less."),
        }),
      ],
      validation: buildImageValidation({
        ...IMAGE_RULES.menu,
        fieldLabel: "Menu item image",
      }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL-friendly version of the name. It auto-fills from the name and can be edited.",
      options: {
        source: "name",
        slugify: SLUGIFY,
        maxLength: 96,
      },
      validation: slugFormatValidation("Menu item slug"),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Helpful labels such as spicy, vegan, or gluten-free.",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.unique().max(10).error("Use up to 10 unique tags."),
    }),
    defineField({
      name: "featuredToggle",
      title: "Featured Toggle",
      type: "boolean",
      description: "Turn on to highlight this item in featured sections.",
      initialValue: false,
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "boolean",
      description: "Turn on when this item is currently available to order.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
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
