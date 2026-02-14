import { defineField, defineType } from "sanity";
import { buildImageValidation, IMAGE_RULES } from "./validationHelpers";

export default defineType({
  name: "promotion",
  title: "Promotion",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the promotion customers will see.",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(90)
          .error("Promotion title is required and should be 3-90 characters."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Plain-language details about the offer.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(400)
          .error("Description is required and should be 10-400 characters."),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Promotional image used in banners or cards.",
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
            "Describe the promotion image for accessibility and SEO.",
          validation: (Rule) =>
            Rule.required()
              .min(8)
              .max(140)
              .error(
                "Promotion image alt text is required (8-140 characters).",
              ),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional short caption for this promotion image.",
          validation: (Rule) =>
            Rule.max(180).error("Caption must be 180 characters or less."),
        }),
      ],
      validation: buildImageValidation({
        ...IMAGE_RULES.hero,
        fieldLabel: "Promotion image",
      }),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "Date when this promotion starts.",
      validation: (Rule) => Rule.required().error("Start date is required."),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Date when this promotion ends.",
      validation: (Rule) =>
        Rule.required()
          .min(Rule.valueOfField("startDate"))
          .error("End date must be on or after the start date."),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description:
        "Turn on when this promotion should be visible to customers.",
      initialValue: false,
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
