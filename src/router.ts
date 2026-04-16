import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import ChordsPage from './features/chords/ChordsPage'
import ChordDetailPage from './features/chords/ChordDetailPage'
import SongsPage from './features/songs/SongsPage'
import SongDetailPage from './features/songs/SongDetailPage'
import MetronomePage from './features/metronome/MetronomePage'
import TunerPage from './features/tuner/TunerPage'
import PracticePage from './features/practice/PracticePage'
import ProgressPage from './features/progress/ProgressPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'chords', Component: ChordsPage },
      { path: 'chords/:chordId', Component: ChordDetailPage },
      { path: 'songs', Component: SongsPage },
      { path: 'songs/:songId', Component: SongDetailPage },
      { path: 'metronome', Component: MetronomePage },
      { path: 'tuner', Component: TunerPage },
      { path: 'practice', Component: PracticePage },
      { path: 'progress', Component: ProgressPage },
    ],
  },
])
