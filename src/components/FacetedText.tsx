import stringByteSlice from 'string-byte-slice';
import { BskyPost } from '../lib/bluesky/types';
import { Link } from './ui/Link';
import { FormattedText } from './ui/FormattedText';

type FacetedTextProps = {
  text: string;
  facets: BskyPost['record']['facets'];
};

export const FacetedText = ({ text, facets }: FacetedTextProps) => {
  // Sort facets by start index to process them in order
  const sortedFacets = facets?.sort((a, b) => a.index.byteStart - b.index.byteStart) ?? [];

  if (sortedFacets.length === 0) {
    return <FormattedText text={text} />;
  }

  const parts: React.ReactNode[] = [];

  // Add text before first facet
  parts.push(<FormattedText text={stringByteSlice(text, 0, sortedFacets[0]?.index.byteStart)} key="text-start" />);

  for (let i = 0; i < sortedFacets.length; i++) {
    const facet = sortedFacets[i];

    // Render the facet
    const facetText = stringByteSlice(text, facet.index.byteStart, facet.index.byteEnd);

    // Determine rendering based on facet type
    const firstFeature = facet.features[0];
    switch (firstFeature.$type) {
      case 'app.bsky.richtext.facet#link':
        parts.push(
          <>
            <FormattedText text={' '} key={`text-${i}`} />
            <ExternalLink key={`facet-${i}`} href={firstFeature.uri}>
              {facetText}
            </ExternalLink>
          </>,
        );
        break;
      case 'app.bsky.richtext.facet#mention':
        parts.push(
          <>
            <FormattedText text={' '} key={`text-${i}`} />
            <Mention key={`facet-${i}`} handle={facetText.slice(1)} />
          </>,
        );
        break;
      case 'app.bsky.richtext.facet#tag':
        parts.push(
          <>
            <FormattedText text={' '} key={`text-${i}`} />
            <HashTag key={`facet-${i}`} tag={facetText.slice(1)} />
          </>,
        );
        break;
    }
  }

  // Add remaining text after the last facet
  parts.push(
    <FormattedText key="text-ending" text={stringByteSlice(text, sortedFacets[sortedFacets.length - 1]?.index.byteEnd)} />,
  );

  return parts;
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

function Mention({ handle }: { handle: string }) {
  return (
    <Link to="/profile/$handle" params={{ handle }}>
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
