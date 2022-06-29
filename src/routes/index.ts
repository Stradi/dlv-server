import { Request, Response, Router } from 'express';
import { getVideoInfo, VideoData } from '../lib/ytdl';

const router: Router = Router();

router.post('/dl', async (req: Request, res: Response) => {
  if (!req.body.url) {
    res.json({
      error: 'No url is provided',
    });
    return;
  }

  const video = await getVideoInfo(req.body.url as string);
  if (!video) {
    res.json({
      error: 'Video could not found',
    });
    return;
  }

  res.json({
    video,
  });
});

export default router;
