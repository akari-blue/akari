import * as React from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { cn } from '../../lib/utils';

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => {
    return <a ref={ref} {...props} className={cn('hover:underline', props.className)} />;
  },
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent to={props.href} {...props} />;
};
