import React, { useEffect, useState } from 'react';
import GitrepoItem from './GitrepoItem';

const GitrepoList = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 30;

  const fetchRepos = async (pageToFetch) => {
    if (loading || !hasMore) return;
    setLoading(true);

    
    const date = new Date();
    date.setDate(date.getDate() - 10); // Last 10 days
    const formattedDate = date.toISOString().split('T')[0];

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${pageToFetch}&per_page=${perPage}`
      );

      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const existingIds = new Set(repos.map((repo) => repo.id));
        const newItems = data.items.filter((item) => !existingIds.has(item.id));

        setRepos((prev) => [...prev, ...newItems]);

        if (data.items.length < perPage) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching repos:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes
  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  // Scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (nearBottom && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      {/* Initial loading spinner centered top */}
      {repos.length === 0 && loading && (
        <div className="loading-spinner-center" aria-live="polite" aria-busy="true" role="status">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      )}

      {repos.map((repo) => (
        <GitrepoItem key={repo.id} repo={repo} />
      ))}

      {/* Infinite scroll loading spinner bottom center */}
      {repos.length > 0 && loading && (
        <div className="loading-spinner-bottom" aria-live="polite" aria-busy="true" role="status">
          <div className="spinner"></div>
          <span>Loading more...</span>
        </div>
      )}

      {!hasMore && repos.length > 0 && (
        <div className="gitrepo-end-message" role="alert">
          No more repos to load.
        </div>
      )}
    </>
  );
};

export default GitrepoList;
