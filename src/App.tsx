import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/PostForm";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/postform" element={<PostForm />} />
      </Routes>
    </Container>
  );
}

export default App;
