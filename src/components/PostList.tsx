import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function PostList() {
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
    </>
  );
}

export default PostList;
