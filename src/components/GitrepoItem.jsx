import { FaStar } from 'react-icons/fa';
import '../Styles.css';

function formatStars(count) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}k`;
  return count.toString();
}

function GitrepoItem({ repo }) {
  const starCount = repo?.stargazers_count ?? 0;
  const owner = repo?.owner ?? {};
  const ownerLogin = owner.login ?? 'unknown';
  const ownerAvatar = owner.avatar_url ?? '';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card"
      aria-label={`Open GitHub repository ${repo.name} by ${ownerLogin}, with ${starCount.toLocaleString()} stars`}
    >
      <div className="repo-name">{repo.name}</div>

      <div className="repo-description">
        {repo.description || "No description provided."}
      </div>

      <div className="repo-footer">
        <div className="repo-owner">
          <img
            src={ownerAvatar}
            alt={`Avatar of ${ownerLogin}`}
            loading="lazy"
            width={36}
            height={36}
          />
          {ownerLogin}
        </div>

        <div className="repo-stars" aria-label={`${starCount.toLocaleString()} stars`}>
          <FaStar color="#facc15" size={14} style={{ marginRight: 4 }} aria-hidden="true" />
          <span>{formatStars(starCount)} stars</span>
        </div>
      </div>
    </a>
  );
}

export default GitrepoItem;
