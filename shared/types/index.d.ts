export interface Stream {
  data: StreamData[]
  jokeScoreTotal: number
  userID: string
  jokeScoreMax: number
  streamUpTime: 443
  userName: string
  startedAt: string
  id: string
  jokeScoreLow: number
  type: string
  jokeScoreHigh: number
  games: StreamGame[]
  title: string
  thumbnailURL: string
  video: StreamVideo
  jokeScoreMin: number
}

interface StreamData {
  close: number
  high: number
  interval: number
  jokeScore: number
  low: number
  open: number
  totalMinusTwo: number
  totalPlusTwo: number
  volume: number
}

interface StreamGame {
  boxArtURL: string
  id: string
  name: string
}

interface StreamVideo {
  URL: string
  createdAt: string
  duration: string
  id: string
  publishedAt: string
  thumbnailURL: string
  title: string
  type: string
  userID: string
  userName: string
}
