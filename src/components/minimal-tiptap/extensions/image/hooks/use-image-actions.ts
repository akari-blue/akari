import type { Editor } from '@tiptap/react';
import type { Node } from '@tiptap/pm/model';
import { isUrl } from '../../../utils';
import { useMemo, useCallback } from 'react';

interface UseImageActionsProps {
  editor: Editor;
  node: Node;
  src: string;
  onViewClick: (value: boolean) => void;
}

export type ImageActionHandlers = {
  onView?: () => void;
  onDownload?: () => void;
  onCopy?: () => void;
  onCopyLink?: () => void;
  onRemoveImg?: () => void;
};

export const useImageActions = ({ editor, node, src, onViewClick }: UseImageActionsProps) => {
  const isLink = useMemo(() => isUrl(src), [src]);

  const onView = useCallback(() => {
    onViewClick(true);
  }, [onViewClick]);

  const onDownload = useCallback(() => {
    editor.commands.downloadImage({ src: node.attrs.src, alt: node.attrs.alt });
  }, [editor.commands, node.attrs.alt, node.attrs.src]);

  const onCopy = useCallback(() => {
    editor.commands.copyImage({ src: node.attrs.src });
  }, [editor.commands, node.attrs.src]);

  const onCopyLink = useCallback(() => {
    editor.commands.copyLink({ src: node.attrs.src });
  }, [editor.commands, node.attrs.src]);

  const onRemoveImg = useCallback(() => {
    editor.commands.command(({ tr, dispatch }) => {
      const { selection } = tr;
      const nodeAtSelection = tr.doc.nodeAt(selection.from);

      if (nodeAtSelection && nodeAtSelection.type.name === 'image') {
        if (dispatch) {
          tr.deleteSelection();
          return true;
        }
      }
      return false;
    });
  }, [editor.commands]);

  return { isLink, onView, onDownload, onCopy, onCopyLink, onRemoveImg };
};
