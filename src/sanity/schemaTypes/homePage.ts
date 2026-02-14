import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "object",
      description: "Main hero content shown at the top of the home page.",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          description: "Main heading visitors see first.",
          validation: (Rule) =>
            Rule.required()
              .min(5)
              .max(90)
              .error("Hero title is required and should be 5-90 characters."),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          description: "Supporting line under the main heading.",
          validation: (Rule) =>
            Rule.required()
              .min(10)
              .max(180)
              .error(
                "Hero subtitle is required and should be 10-180 characters.",
              ),
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          description:
            "Hero banner image. Keep quality high but file size low.",
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
                "Describe the hero image for people using screen readers and for SEO.",
              validation: (Rule) =>
                Rule.required()
                  .min(8)
                  .max(140)
                  .error("Hero image alt text is required (8-140 characters)."),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional helper text for the hero image.",
              validation: (Rule) =>
                Rule.max(180).error("Caption must be 180 characters or less."),
            }),
          ],
          validation: buildImageValidation({
            ...IMAGE_RULES.hero,
            required: true,
            fieldLabel: "Hero image",
          }),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error("Hero headline content is required."),
    }),
    defineField({
      name: "featuredCategories",
      title: "Featured Categories",
      type: "array",
      description:
        "Choose the order of featured categories as they should appear on the page.",
      of: [
        {
          type: "reference",
          to: [{ type: "menuCategory" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().error(
          "Featured categories order should not contain duplicates.",
        ),
    }),
    defineField({
      name: "featuredMenuItems",
      title: "Featured Menu Items",
      type: "array",
      description: "Menu items to spotlight on the home page.",
      of: [
        {
          type: "reference",
          to: [{ type: "menuItem" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().max(12).error("Use up to 12 unique featured menu items."),
    }),
    defineField({
      name: "promotions",
      title: "Promotions",
      type: "array",
      description: "Promotions to show on the home page.",
      of: [
        {
          type: "reference",
          to: [{ type: "promotion" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().max(8).error("Use up to 8 unique promotions."),
    }),
    defineField({
      name: "galleryImagesReference",
      title: "Gallery Images",
      type: "array",
      description: "Gallery images displayed on the home page.",
      of: [
        {
          type: "reference",
          to: [{ type: "galleryImage" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().max(24).error("Use up to 24 unique gallery images."),
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      description: "Customer reviews shown on the home page.",
      of: [
        {
          type: "reference",
          to: [{ type: "review" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().max(12).error("Use up to 12 unique reviews."),
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline.title",
      media: "heroHeadline.image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || "Home Page",
        media,
      };
    },
  },
});
