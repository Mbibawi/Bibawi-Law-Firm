import { pages, posts as pagePostsGroups } from "./data/posts.js";

// Flatten the structure for global search/filtering
const initialPosts = [
  ...pages,
  ...pagePostsGroups.flatMap((group) => group.posts),
].sort(
  (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
);

let state: {
  pages: Post[];
  pagePosts: { id: string; posts: Post[] }[];
  posts: Post[];
  filteredPosts: Post[];
  searchQuery: string;
  loading: boolean;
} = {
  pages: pages,
  pagePosts: pagePostsGroups,
  posts: initialPosts,
  filteredPosts: initialPosts,
  searchQuery: "",
  loading: false,
};

const listeners: (() => void)[] = [];

export const getState = () => state;

export const setState = (newState: any) => {
  state = { ...state, ...newState };
  listeners.forEach((l) => l());
};

export const subscribe = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};

export const handleSearch = (query: string) => {
  const q = query.toLowerCase();
  const filtered = state.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
  setState({ searchQuery: query, filteredPosts: filtered });
};
