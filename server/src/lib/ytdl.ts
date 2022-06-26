import ytdl, { videoInfo } from "ytdl-core";

interface VideoData {
  id: string;
  title: string;
  author: string;
  url: string;
  thumbnails: Thumbnail[];
  formats: Format[];
}

interface Thumbnail {
  url: string;
  size: string;
}

interface Format {
  type: FormatType;
  quality: string;
  container: string;
  codecs: string;
  url: string;
  bitrate: string;
}

enum FormatType {
  main,
  audio,
  video,
}

const getVideoInfo = async (url: string): Promise<VideoData> => {
  let video: videoInfo = <videoInfo>{};
  let videoData: VideoData = <VideoData>{};

  try {
    video = await ytdl.getInfo(url);
  } catch (e) {
    return <VideoData>{};
  }

  videoData.id = video.videoDetails.videoId;
  videoData.url = video.videoDetails.video_url;
  videoData.title = video.videoDetails.title;
  videoData.author = video.videoDetails.author.name;

  videoData.thumbnails = video.videoDetails.thumbnails.map((thumbnail) => ({
    url: thumbnail.url,
    size: `${thumbnail.width}x${thumbnail.height}`,
  }));

  videoData.formats = video.formats.map((format) => ({
    type:
      format.hasVideo && format.hasAudio
        ? FormatType.main
        : format.hasVideo
        ? FormatType.video
        : FormatType.audio,
    quality: format.qualityLabel,
    container: format.container,
    codecs: format.codecs,
    url: format.url,
    bitrate: format.bitrate
      ? format.bitrate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : "Unknown",
  }));

  videoData.formats = videoData.formats.sort((a: Format, b: Format) =>
    a.type < b.type ? -1 : a.type > b.type ? 1 : 0
  );

  return videoData;
};

export { getVideoInfo };
