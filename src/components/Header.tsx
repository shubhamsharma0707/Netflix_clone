import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';

const categories = [
  { label: 'Home', path: '/' },
  { label: 'Popular', path: '/category/popular' },
  { label: 'Trending', path: '/category/trending' },
  { label: 'Top Rated', path: '/category/top_rated' },
  { label: 'Now Playing', path: '/category/now_playing' },
  { label: 'Upcoming', path: '/category/upcoming' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__left">
          <Link to="/" className="header__logo">
            NETFLIX
          </Link>
          <nav className="header__nav">
            {categories.map((cat) => (
              <Link key={cat.path} to={cat.path} className="header__link">
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header__right">
          <button
            className="header__search-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </header>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
