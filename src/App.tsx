import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";
import { useLocalStorage } from "./hooks/useLocalStorages";
import { useMemo } from "react";

export type RawPost = {
  id: string;
} & RawPostData;

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
  lable: string;
};
function App() {
  const [posts, setPosts] = useLocalStorage<RawPost[]>("POSTS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  useMemo(() => {
    posts.map((item) => {
      return {
        ...item,
        tags: tags.filter((t) => item.tagIds.includes(t.id)),
      };
    });
  }, [posts, tags]);
  return (
    <Container>
      <Routes>
        <Route path="/postform" element={<PostForm />} />
      </Routes>
    </Container>
  );
}

export default App;
