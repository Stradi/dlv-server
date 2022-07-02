import { format } from 'path';
import ytdl, { YtFormat, YtResponse, YtThumbnail } from 'youtube-dl-exec';

export interface VideoData {
  id: string;
  title: string;
  thumbnails: YtThumbnail[];
  formats: Format[];
  duration: string;
}

export interface Format {
  id: string;
  filesize: number;
  url: string;
  resolution: string;
  hasVideo: boolean;
}

const getVideoInfo = async (url: string): Promise<VideoData | null> => {
  let video: YtResponse = <YtResponse>{};
  let videoData: VideoData = <VideoData>{};

  try {
    video = await ytdl(url, {
      dumpJson: true,
    });
  } catch (e) {
    return Promise.resolve(null);
  }

  videoData.id = video.id;
  videoData.title = video.title;
  videoData.thumbnails = video.thumbnails;
  videoData.formats = video.formats
    .filter(
      (format) =>
        (format.protocol == 'https' || format.protocol == 'http') &&
        format.acodec != 'none'
    )
    .map((format) => ({
      id: format.format_id,
      filesize: format.filesize,
      resolution:
        format.acodec != 'none' && format.vcodec == 'none'
          ? format.abr.toString()
          : `${format.width}x${format.height}`,
      url: `${format.url}`,
      hasVideo: format.vcodec != 'none',
    }));

  videoData.duration = video.duration.toString();

  return Promise.resolve(videoData);
};

export { getVideoInfo };
