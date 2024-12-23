import { z } from 'zod';
import { BSkyPostEmbedExternal } from './BSkyPostEmbedExternal';
import { BSkyPostEmbedImages } from './BSkyPostEmbedImages';
import { BSkyPostEmbedRecord } from './BSkyPostEmbedRecord';
import { BSkyPostEmbedRecordWithMedia } from './BSkyPostEmbedRecordWithMedia';
import { BSkyPostEmbedVideo } from './BSkyPostEmbedVideo';
import { BSkyPostEmbedRecordWithMediaView } from './BSkyPostEmbedRecordWithMediaView';

export const BSkyPostEmbed = z.union([
  BSkyPostEmbedExternal,
  BSkyPostEmbedImages,
  BSkyPostEmbedVideo,
  BSkyPostEmbedRecord,
  BSkyPostEmbedRecordWithMedia,
  BSkyPostEmbedRecordWithMediaView,
]);

export type BSkyPostEmbed = z.infer<typeof BSkyPostEmbed>;
