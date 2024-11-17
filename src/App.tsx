import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorages";
import { useEffect, useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import PostLayout from "./components/PostLayout";
import Post from "./components/Post";
import EditPost from "./components/EditPost";

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
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const defaultPosts: RawPost[] = [
    {
      id: uuidV4(),
      title: "پست اول",
      markdown: "این اولین پست بلاگ است",
      tagIds: [],
    },
    {
      id: uuidV4(),
      title: "پست دوم",
      markdown: "این دومین پست بلاگ هست",
      tagIds: [],
    },
  ];

  useEffect(() => {
    if (posts.length === 0) {
      setPosts(defaultPosts);
    }
  }, [posts, setPosts]);

  const postsWithTag = useMemo(() => {
    return posts.map((item) => {
      return {
        ...item,
        tags: tags.filter((t) => item.tagIds.includes(t.id)),
      };
    });
  }, [posts, tags]);

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return [
        ...prevPosts,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((item) => {
            return item.id;
          }),
        },
      ];
    });
  }

  function onUpdatePost(id: string, { tags, ...data }: PostData) {
    setPosts((prevNotes) => {
      return prevNotes.map((item) => {
        if (item.id === id) {
          return { ...item, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return item;
        }
      });
    });
  }

  function onDeletePost(id: string) {
    setPosts((prevPosts) => {
      return prevPosts.filter((item) => item.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <PostList
              availabelTags={tags}
              posts={postsWithTag}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
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
        <Route path=":id" element={<PostLayout posts={postsWithTag} />}>
          <Route index element={<Post deletePost={onDeletePost} />} />
          <Route
            path="edit"
            element={
              <EditPost
                onSubmit={onUpdatePost}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
