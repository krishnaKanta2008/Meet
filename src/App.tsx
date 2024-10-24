import VideoConference from './components/VideoConference/VideoConference';

const App: React.FC = () => {
  const username = 'Ram';
  return (
    <>
      <VideoConference username={username} />
    </>
  )
}

export default App