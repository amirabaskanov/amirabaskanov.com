import { useEffect, useState, useCallback } from 'react';
import { SpotifyIcon } from '../icons/Spotify';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

export function BentoItemNowPlaying() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  const fetchNowPlaying = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetchTime < 30000) {
      return;
    }

    try {
      setLastFetchTime(now);
      const response = await fetch(`/api/spotify/now-playing?t=${now}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.title) {
        setSpotifyData(data);
        setError(null);
      } else if (data.error) {
        setError(data.details || data.error);
      } else {
        setError('No track data available');
      }
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch track data');
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  useEffect(() => {
    fetchNowPlaying(true);

    const interval = setInterval(() => {
      fetchNowPlaying(false);
    }, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchNowPlaying(false);
      }
    };

    const handleFocus = () => {
      fetchNowPlaying(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchNowPlaying]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-[var(--t-text-body)]">Loading...</p>
      </div>
    );
  }

  if (error || !spotifyData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-[var(--t-text-body)]">Unable to load track data</p>
      </div>
    );
  }

  return (
    <a
      href={spotifyData.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full items-center px-0"
    >
      <img
        src={spotifyData.albumImageUrl}
        alt={`${spotifyData.title} album art`}
        className="h-[90px] w-[90px] rounded-lg object-cover"
      />

      <div className="ml-4 flex flex-col justify-center space-y-1.5 overflow-hidden">
        <p className={`text-xs ${
          spotifyData.isPlaying ? 'animate-[pulse_2s_ease-in-out_infinite] text-[var(--t-text-primary)]' : 'text-[var(--t-text-body)]'
        }`}>
          {spotifyData.isPlaying ? 'Now Playing' : 'Last Played'}
        </p>
        <p className="truncate text-sm font-medium text-[var(--t-text-primary)]">
          {spotifyData.title}
        </p>
        <p className="truncate text-xs text-[var(--t-text-body)]">
          {spotifyData.artist}
        </p>
      </div>

      <div className="absolute -right-2 -top-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--t-spotify-badge)] z-10 border border-[var(--t-border)]">
          <SpotifyIcon className="h-4 w-4 text-[var(--t-icon-color)] group-hover:text-[#1DB954]" />
        </div>
      </div>
    </a>
  );
}
