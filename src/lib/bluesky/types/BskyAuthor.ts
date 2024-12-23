import { z } from 'zod';
import { Author } from './Author';
import { BlockedAuthor } from './BlockedAuthor';

export const BSkyAuthor = z.union([Author, BlockedAuthor]);

export type BSkyAuthor = z.infer<typeof BSkyAuthor>;
