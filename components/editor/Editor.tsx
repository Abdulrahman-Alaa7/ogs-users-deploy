"use client";

import Theme from "./plugins/Theme";
import { HeadingNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import React, { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useTranslations } from "next-intl";

function Placeholder() {
  const t = useTranslations("HomeProducts");
  return <div className="editor-placeholder">{t("descRules")}</div>;
}

type Props = {
  value: any;
};

export function Editor({ value }: Props) {
  const initialConfig = {
    namespace: "Editor",
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    readOnly: true,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <InnerEditor value={value} />
    </LexicalComposer>
  );
}

const InnerEditor = ({ value }: Props) => {
  const [editor] = useLexicalComposerContext();
  editor.setEditable(false);

  useEffect(() => {
    editor.setEditable(false);
    editor.update(() => {
      if (value) {
        editor.setEditorState(editor.parseEditorState(JSON.parse(value)));
      }
    });
  }, [editor]);

  return (
    <div className="editor-container size-full">
      <div className="editor-wrapper flex flex-col items-center justify-start">
        <div className="editor-inner !border-primary  !max-h-[600px] rounded-3xl overflow-auto mt-1 border transition-all w-full relative shadow-md lg:mb-10">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input !min-h-fit" readOnly />
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
    </div>
  );
};
