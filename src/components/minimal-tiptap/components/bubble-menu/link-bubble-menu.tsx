import type { ShouldShowProps } from '../../types';
import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import { LinkEditBlock } from '../link/link-edit-block';
import { LinkPopoverBlock } from '../link/link-popover-block';
import { useCallback, useState } from 'react';

type LinkBubbleMenuProps = {
  editor: Editor;
};

type LinkAttributes = {
  href: string;
  target: string;
};

export const LinkBubbleMenu = ({ editor }: LinkBubbleMenuProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [linkAttrs, setLinkAttrs] = useState<LinkAttributes>({ href: '', target: '' });
  const [selectedText, setSelectedText] = useState('');

  const updateLinkState = useCallback(() => {
    const { from, to } = editor.state.selection;
    const { href, target } = editor.getAttributes('link');
    const text = editor.state.doc.textBetween(from, to, ' ');

    setLinkAttrs({ href, target });
    setSelectedText(text);
  }, [editor]);

  const shouldShow = useCallback(
    ({ editor, from, to }: ShouldShowProps) => {
      if (from === to) {
        return false;
      }
      const { href } = editor.getAttributes('link');

      if (href) {
        updateLinkState();
        return true;
      }
      return false;
    },
    [updateLinkState],
  );

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: openInNewTab ? '_blank' : '',
              },
            },
          ],
        })
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run();
      setShowEdit(false);
      updateLinkState();
    },
    [editor, updateLinkState],
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShowEdit(false);
    updateLinkState();
  }, [editor, updateLinkState]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: 'bottom-start',
        onHidden: () => setShowEdit(false),
      }}
    >
      {showEdit ? (
        <LinkEditBlock
          defaultUrl={linkAttrs.href}
          defaultText={selectedText}
          defaultIsNewTab={linkAttrs.target === '_blank'}
          onSave={onSetLink}
          className="w-full min-w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none"
        />
      ) : (
        <LinkPopoverBlock onClear={onUnsetLink} url={linkAttrs.href} onEdit={handleEdit} />
      )}
    </BubbleMenu>
  );
};
