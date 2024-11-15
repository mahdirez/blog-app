import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorages";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

export type RawPost = {
  id: string;
} & RawPostData;

export type Post = {
  id: string;
} & PostData;

export type RawPostData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type PostData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};
function App() {
  const [posts, setPosts] = useLocalStorage<RawPost[]>("POSTS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const postsWithTag = useMemo(() => {
    return posts.map(item => {
      return {
        ...item,
        tags: tags.filter(t => item.tagIds.includes(t.id)),
      };
    });
  }, [posts, tags]);

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts(prevPosts => {
      return [
        ...prevPosts,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map(item => {
            return item.id;
          }),
        },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<PostList availabelTags={tags} posts={postsWithTag} />}
        />
        <Route
          path="/add"
          element={
            <AddPost
              onSubmit={onCreatePost}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
