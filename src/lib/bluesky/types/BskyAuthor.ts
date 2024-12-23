import { Static, Type } from '@sinclair/typebox';
import { Author } from './Author';
import { BlockedAuthor } from './BlockedAuthor';

export const BSkyAuthor = Type.Union([Author, BlockedAuthor]);

export type BSkyAuthor = Static<typeof BSkyAuthor>;
