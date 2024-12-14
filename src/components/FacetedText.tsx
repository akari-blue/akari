import { BskyPost } from '../lib/bluesky/types';
import { Link } from '@tanstack/react-router';

// Utility function to get byte-aware substring
function getByteSubstring(str: string, start: number, end: number): string {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const bytes = encoder.encode(str);
  const slicedBytes = bytes.slice(start, end);

  return decoder.decode(slicedBytes);
}

type FacetedTextProps = {
  text: string;
  facets: BskyPost['record']['facets'];
};

export const FacetedText = ({ text, facets }: FacetedTextProps) => {
  // Sort facets by start index to process them in order
  const sortedFacets = facets?.sort((a, b) => a.index.byteStart - b.index.byteStart) ?? [];

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  for (let i = 0; i < sortedFacets.length; i++) {
    const facet = sortedFacets[i];

    // Add text before the facet
    if (facet.index.byteStart > lastIndex) {
      parts.push(<Text text={getByteSubstring(text, lastIndex, facet.index.byteStart)} />);
    }

    // Render the faceted portion
    const facetText = getByteSubstring(text, facet.index.byteStart, facet.index.byteEnd);

    // Determine rendering based on facet type
    const firstFeature = facet.features[0];
    switch (firstFeature.$type) {
      case 'app.bsky.richtext.facet#link':
        parts.push(
          <ExternalLink key={`facet-${i}`} href={firstFeature.uri}>
            {facetText}
          </ExternalLink>,
        );
        break;
      case 'app.bsky.richtext.facet#mention':
        parts.push(<Mention key={`facet-${i}`} handle={facetText.slice(1)} />);
        break;
      case 'app.bsky.richtext.facet#tag':
        parts.push(<HashTag key={facetText} tag={facetText.slice(1)} />);
        break;
    }

    lastIndex = facet.index.byteEnd;
  }

  // Add remaining text after the last facet
  if (lastIndex < text.length) {
    parts.push(<Text text={getByteSubstring(text, lastIndex, text.length)} />);
  }

  return parts;
};

function ExternalLink({ key, href, children }: { key: string; href: string; children: React.ReactNode }) {
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
      {children}
    </a>
  );
}

function Mention({ key, handle }: { key: string; handle: string }) {
  return (
    <Link to="/profile/$handle" params={{ handle }}>
      <span key={key} className="text-purple-500 font-semibold">
        @{handle.replace('.bksy.social', '')}
      </span>
    </Link>
  );
}

function HashTag({ key, tag }: { key: string; tag: string }) {
  return (
    <Link to="/tag/$tag" params={{ tag }}>
      <span key={key} className="text-green-500">
        #{tag}
      </span>
    </Link>
  );
}

function Text({ text }: { text: string }) {
  // we need to make a new line work in the browser
  return (
    <span>
      {text.split('\n').map((line, index) => (
        <>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </>
      ))}
    </span>
  );
}
