"use client";

import { useEffect, useRef } from "react";

interface PostEmbedProps {
  embedCode: string;
}

export function PostEmbed({ embedCode }: PostEmbedProps) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedRef.current && embedCode) {
      // Clear existing content
      embedRef.current.innerHTML = "";

      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = embedCode;

      // Sanitize and only allow safe elements
      const allowedTags = [
        "iframe",
        "div",
        "script",
        "blockquote",
        "twitter-widget",
      ];
      const allowedAttributes = [
        "src",
        "width",
        "height",
        "class",
        "style",
        "frameborder",
        "allow",
        "allowfullscreen",
      ];

      const sanitizeElement = (element: Element): Element => {
        // Remove disallowed tags
        if (!allowedTags.includes(element.tagName.toLowerCase())) {
          return document.createDocumentFragment() as unknown as Element;
        }

        // Remove disallowed attributes
        const attributes = Array.from(element.attributes);
        attributes.forEach((attr) => {
          if (!allowedAttributes.includes(attr.name.toLowerCase())) {
            element.removeAttribute(attr.name);
          }
        });

        // Recursively sanitize children
        Array.from(element.children).forEach((child) => {
          const sanitizedChild = sanitizeElement(child);
          if (sanitizedChild.parentNode !== element) {
            element.appendChild(sanitizedChild);
          }
        });

        return element;
      };

      Array.from(tempDiv.children).forEach((child) => {
        const sanitizedChild = sanitizeElement(child);
        embedRef.current?.appendChild(sanitizedChild);
      });
    }
  }, [embedCode]);

  return (
    <div
      ref={embedRef}
      className="embed-container"
      style={{ maxWidth: "100%", overflow: "hidden" }}
    />
  );
}
