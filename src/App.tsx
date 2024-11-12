import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";

export type Post = {
  id: string;
} & PostData;

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
  return (
    <Container>
      <Routes>{/* <Route path="/postform" element={<PostForm />} /> */}</Routes>
    </Container>
  );
}

export default App;
