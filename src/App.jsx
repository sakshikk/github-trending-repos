
import GitrepoList from './components/GitrepoList';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <>
    <div className="gitrepo-container">
      <h1 className="gitrepo-header">Top Starred Repos</h1>
      <GitrepoList />
    </div>

    <BottomNav />
    </>
  );
}
export default App;



