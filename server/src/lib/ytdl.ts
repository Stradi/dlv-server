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
        format.vcodec != 'none' &&
        format.acodec != 'none' &&
        (format.protocol == 'https' || format.protocol == 'http')
    )
    .map((format) => ({
      id: format.format_id,
      filesize: format.filesize,
      resolution: `${format.width}x${format.height}`,
      url: format.url,
    }));

  videoData.duration = video.duration.toString();

  return Promise.resolve(videoData);
};

export { getVideoInfo };
