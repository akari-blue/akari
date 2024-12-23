import { BSkyPostEmbedExternal } from './BSkyPostEmbedExternal';
import { BSkyPostEmbedImages } from './BSkyPostEmbedImages';
import { BSkyPostEmbedRecord } from './BSkyPostEmbedRecord';
import { BSkyPostEmbedRecordWithMedia } from './BSkyPostEmbedRecordWithMedia';
import { BSkyPostEmbedVideo } from './BSkyPostEmbedVideo';
import { BSkyPostEmbedRecordWithMediaView } from './BSkyPostEmbedRecordWithMediaView';
import { Static, Type } from '@sinclair/typebox';

export const BSkyPostEmbed = Type.Union([
  BSkyPostEmbedExternal,
  BSkyPostEmbedImages,
  BSkyPostEmbedVideo,
  BSkyPostEmbedRecord,
  BSkyPostEmbedRecordWithMedia,
  BSkyPostEmbedRecordWithMediaView,
]);

export type BSkyPostEmbed = Static<typeof BSkyPostEmbed>;
