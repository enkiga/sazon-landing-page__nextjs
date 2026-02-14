import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the person who left the review.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Author is required and should be 2-80 characters."),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Score from 1 to 5 stars.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(5)
          .error("Rating must be a whole number between 1 and 5."),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      description: "What the customer said about their experience.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(800)
          .error("Comment is required and should be 10-800 characters."),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Date the review was written.",
      validation: (Rule) => Rule.required().error("Date is required"),
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "comment",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : "No comment",
      };
    },
  },
});
