import { Facet } from '@atproto/api';
import { JSONContent } from '@tiptap/react';

const markTypeToFacetType = {
  link: 'app.bsky.richtext.facet#link',
  mention: 'app.bsky.richtext.facet#mention',
  bold: 'app.bsky.richtext.facet#bold',
  italic: 'app.bsky.richtext.facet#italic',
  underline: 'app.bsky.richtext.facet#underline',
};

export function convertJSONToPost(
  node: JSONContent,
  currentPosition = 0,
  listCounter = 1,
  listType: 'orderedList' | 'bulletList' | null = null,
): {
  text: string;
  facets: Facet[];
  position: number;
} {
  let text = '';
  const facets: Facet[] = [];

  // if node is hardBreak
  if (node.type === 'hardBreak') {
    return { text: '\n', facets, position: currentPosition + 1 };
  }

  // If node has direct text
  if (node.text) {
    text = node.text;

    // Process marks if they exist
    if (node.marks) {
      for (const mark of node.marks) {
        facets.push({
          index: {
            byteStart: currentPosition,
            byteEnd: currentPosition + text.length + 1,
          },
          features: [
            {
              $type: markTypeToFacetType[mark.type as keyof typeof markTypeToFacetType],
              ...(mark.type === 'link' ? { uri: mark.attrs?.href } : {}),
            },
          ],
        });
      }
    }

    return { text, facets, position: currentPosition + text.length };
  }

  // If node is an ordered list, process each list item
  if (node.type === 'orderedList' && node.content) {
    let currentPos = currentPosition;
    listCounter = node.attrs?.start ?? listCounter;

    for (const childNode of node.content) {
      const result = convertJSONToPost(childNode, currentPos, listCounter, 'orderedList');
      text += result.text;
      facets.push(...result.facets);
      currentPos = result.position;
      listCounter++;
    }

    return { text, facets, position: currentPos };
  }

  // If node is a bullet list, process each list item
  if (node.type === 'bulletList' && node.content) {
    let currentPos = currentPosition;

    for (const childNode of node.content) {
      const result = convertJSONToPost(childNode, currentPos, listCounter, 'bulletList');
      text += result.text + '\n';
      facets.push(...result.facets);
      currentPos = result.position;
    }

    return { text, facets, position: currentPos };
  }

  // If node is a list item, process its content and prepend the list number or bullet
  if (node.type === 'listItem' && node.content) {
    let currentPos = currentPosition;
    let itemText = '';

    if (listType === 'orderedList') {
      itemText = `${listCounter}. `;
    } else {
      itemText = `• `;
    }

    for (const childNode of node.content) {
      const result = convertJSONToPost(childNode, currentPos + itemText.length, listCounter, 'orderedList');
      itemText += result.text + '\n';
      facets.push(...result.facets);
      currentPos = result.position;
    }

    return { text: itemText, facets, position: currentPos + itemText.length };
  }

  // If node has content, process each child
  if (node.content) {
    let currentPos = currentPosition;

    for (const childNode of node.content) {
      const result = convertJSONToPost(childNode, currentPos, listCounter, listType);
      text += result.text + (childNode.type === 'paragraph' ? '\n' : '');
      facets.push(...result.facets);
      currentPos = result.position;
    }
  }

  return { text: text.replace(/\n$/, ''), facets, position: currentPosition + text.length };
}
