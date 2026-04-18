type Route = {
  path: string;
  view: string;
  params?: Record<string, string>;
};

interface Post {
  id: string;
  title: string;
  published: string;
  updated: string;
  content: string;
  type: "POST" | "PAGE";
  tags: string[];
  dir: "rtl" | "ltr";
  audioId: string | null;
  isRoot: boolean;
  parentId?: string;
}
