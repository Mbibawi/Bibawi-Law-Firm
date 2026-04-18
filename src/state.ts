import { posts as importedPosts } from './data/posts.js';



const initialPosts = (importedPosts as any[]).sort((a, b) => 
    new Date(b.published).getTime() - new Date(a.published).getTime()
);

let state: {
    posts: Post[];
    filteredPosts: Post[];
    searchQuery: string;
    loading: boolean;
} = {
    posts: initialPosts,
    filteredPosts: initialPosts,
    searchQuery: '',
    loading: false,
};

const listeners: (() => void)[] = [];

export const getState = () => state;

export const setState = (newState: any) => {
    state = { ...state, ...newState };
    listeners.forEach(l => l());
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
    const filtered = state.posts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
    setState({ searchQuery: query, filteredPosts: filtered });
};
