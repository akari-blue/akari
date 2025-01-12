import { Static, Type } from '@sinclair/typebox';
import { Author } from './author';
import { BlockedAuthor } from './blocked-author';

export const BSkyAuthor = Type.Union([Author, BlockedAuthor]);

export type BSkyAuthor = Static<typeof BSkyAuthor>;
