import stringByteSlice from 'string-byte-slice';
import { Link } from './ui/link';
import { FormattedText } from './ui/formatted-text';
import { BSkyFacet } from '../lib/bluesky/types/bsky-facet';
import { Fragment } from 'react/jsx-runtime';

export const FacetedText = ({ text, facets }: FacetedTextProps) => {
  // Sort facets by start index to process them in order
  const sortedFacets = facets?.sort((a, b) => a.index.byteStart - b.index.byteStart) ?? [];

  if (sortedFacets.length === 0) {
    return <FormattedText text={text} key="text" />;
  }

  const parts: React.ReactNode[] = [];

  // Add text before first facet
  parts.push(<FormattedText text={stringByteSlice(text, 0, sortedFacets[0]?.index.byteStart)} key="text-start" />);

  for (let i = 0; i < sortedFacets.length; i++) {
    const facet = sortedFacets[i];
    if (!facet) continue;

    // Render the facet
    const facetText = stringByteSlice(text, facet.index.byteStart, facet.index.byteEnd);

    // Determine rendering based on facet type
    const firstFeature = facet.features[0];
    switch (firstFeature?.$type) {
      case 'app.bsky.richtext.facet#link':
        parts.push(
          <Fragment key={`facet-${i}-link`}>
            <FormattedText text={' '} key={`text-${i}-link`} />
            <ExternalLink key={`facet-${i}-link`} href={firstFeature.uri}>
              {facetText}
            </ExternalLink>
          </Fragment>,
        );
        break;
      case 'app.bsky.richtext.facet#mention':
        parts.push(
          <Fragment key={`facet-${i}-mention`}>
            <FormattedText text={' '} key={`text-${i}-mention`} />
            <Mention key={`facet-${i}-mention`} handle={facetText.slice(1)} />
          </Fragment>,
        );
        break;
      case 'app.bsky.richtext.facet#tag':
        parts.push(
          <Fragment key={`facet-${i}-tag`}>
            <FormattedText text={' '} key={`text-${i}-tag`} />
            <HashTag key={`facet-${i}-tag`} tag={facetText.slice(1)} />
          </Fragment>,
        );
        break;
    }
  }

  // Add remaining text after the last facet
  const lastFacet = sortedFacets[sortedFacets.length - 1];

  parts.push(<FormattedText key="text-ending" text={stringByteSlice(text, lastFacet?.index.byteEnd ?? text.length)} />);

  return parts;
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-blue-400">
      {children}
    </Link>
  );
}

function Mention({ handle }: { handle: string }) {
  return (
    <Link
      to="/profile/$handle"
      params={{ handle }}
      className="text-blue-400"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <span className="text-purple-500 font-semibold">@{handle.replace('.bksy.social', '')}</span>
    </Link>
  );
}

function HashTag({ tag }: { tag: string }) {
  return (
    <Link to="/tag/$tag" params={{ tag }}>
      <span className="text-green-500">#{tag}</span>
    </Link>
  );
}

type FacetedTextProps = {
  text: string;
  facets: BSkyFacet[];
};
