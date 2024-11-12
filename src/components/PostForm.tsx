import { useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

function PostForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control required ref={titleRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <CreatableSelect placeholder="انتخاب" isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label>پست</Form.Label>
            <Form.Control
              required
              as={"textarea"}
              rows={15}
              ref={markdownRef}
            />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-between"
          >
            <Button type="submit" variant="light">
              انتشار پست
            </Button>
            <Link to={".."}>
              <Button type="button" variant="light">
                لغو
              </Button>
            </Link>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
