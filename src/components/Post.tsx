import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { usePost } from "./PostLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type PostProps = {
  deletePost: (id: string) => void;
};
function Post({ deletePost }: PostProps) {
  const post = usePost();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{post.title}</h2>
          {post.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {post.tags.map((item) => (
                <Badge key={item.id} className="text-truncate">
                  {item.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${post.id}/edit`}>
              <Button variant="light">ویرایش</Button>
            </Link>
            <Button
              variant="outline-light"
              onClick={() => {
                deletePost(post.id);
                navigate("/");
              }}
            >
              حذف
            </Button>
            <Link to={"/"}>
              <Button variant="outline">بازگشت</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </>
  );
}

export default Post;
