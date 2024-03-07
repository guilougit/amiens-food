"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import * as React from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/link.min.js";

import "froala-editor/js/languages/fr.js";
/*
import FroalaEditorComponent from "react-froala-wysiwyg";

const formSchema = z.object({
  title: z.string({ required_error: "" }).min(1),
  slug: z.string({ required_error: "" }).min(1).optional(),
  description: z.string({ required_error: "" }).min(1),
});

export const CreateBlogForm = ({
  defaultPartner,
  isEditing = false,
}: {
  defaultPartner?: any;
  isEditing?: boolean;
}) => {
  const router = useRouter();
  const [slug, setSlug] = useState(defaultPartner ? defaultPartner.slug : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultPartner ? defaultPartner.title : "",
      slug: defaultPartner ? defaultPartner.slug : "",
      description: defaultPartner ? defaultPartner.description : "",
    },
  });

  const options = {
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "subscript",
      "superscript",
      "fontFamily",
      "fontSize",
      "color",
      "emoticons",
      "inlineStyle",
      "paragraphStyle",
      "paragraphFormat",
      "align",
      "formatOL",
      "formatUL",
      "outdent",
      "indent",
      "quote",
      "insertHR",
      "undo",
      "redo",
      "clearFormatting",
      "selectAll",
      "html",
      "insertLink",
      "insertImage",
      "insertVideo",
      "insertTable",
      "insertFile",
      "fullscreen",
      "print",
      "getPDF",
      "spellChecker",
      "help",
      "html",
      "images",
    ],
    pluginsEnabled: [
      "align",
      "charCounter",
      "colors",
      "emoticons",
      "entities",
      "file",
      "fontFamily",
      "fontSize",
      "fullscreen",
      "image",
      "inlineStyle",
      "lineBreaker",
      "link",
      "lists",
      "paragraphFormat",
      "paragraphStyle",
      "quote",
      "save",
      "table",
      "url",
      "video",
    ],
    language: "fr",
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    setIsSubmitting(true);

    formData.append(
      "partner",
      JSON.stringify({
        id: isEditing && defaultPartner ? defaultPartner.id : undefined,
        title: data.title,
        slug: slug,
        description: data.description,
        isEditing: isEditing,
      })
    );
    fetch(
      !isEditing
        ? "/api/admin/blogs"
        : `/api/admin/blogs/${defaultPartner.slug}`,
      { method: !isEditing ? "POST" : "PATCH", body: formData }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (isEditing) {
            toast.success("L'article a bien été modifié");
          } else {
            toast.success("L'article a bien été ajouté");
          }
          router.replace("/admin/blogs");
        }
      });
  };

  const autoFillSlug = (name: string) => {
    const nameWithoutAccent = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const slug = nameWithoutAccent
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
    setSlug(slug);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"w-full md:w-5/6 mx-auto"}
      >
        <div className={"flex gap-12 flex-col md:flex-row"}>
          <div className={"space-y-4 w-full"}>
            <h3 className={"text-xl font-semibold"}>Article</h3>

            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Titre de l'article"
                      {...field}
                      maxLength={25}
                      onInput={(e) => autoFillSlug(e.currentTarget.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"slug"}
              disabled={true}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={25} value={slug} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FroalaEditorComponent
                      tag="textarea"
                      model={field.value}
                      onModelChange={field.onChange}
                      config={options}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type={"submit"} className={"mt-8"} isLoading={isSubmitting}>
          Créer
        </Button>
      </form>
    </Form>
  );
};

 */
