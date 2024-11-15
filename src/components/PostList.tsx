import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import { useState } from "react";

type PostListProps = {
  availabelTags: Tag[];
};
function PostList({ availabelTags }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      <Row>
        <Col>
          <h2>پست ها</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/add"}>
              <Button variant="light">افزودن پست</Button>
            </Link>
            <Button variant="outline-light ">ویرایش تگ ها</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => e.target.value}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PostList;
