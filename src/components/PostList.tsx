import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Post, Tag } from "../App";
import { useMemo, useState } from "react";

type PostCardProps = {
  tags: Tag[];
  title: string;
  id: string;
};

type PostListProps = {
  availabelTags: Tag[];
  posts: PostCardProps[];
};

type EditTagsModal = {
  show: boolean;
  availabelTags: Tag[];
  handleClose: () => void;
};

function PostList({ availabelTags, posts }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((i) => {
      return (
        (title === "" ||
          i.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            i.tags.some((postTag) => postTag.id === tag.id)
          ))
      );
    });
  }, [posts, title, selectedTags]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>پست ها</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/add"}>
              <Button variant="light">افزودن پست</Button>
            </Link>
            <Button
              variant="outline-light "
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              ویرایش تگ ها
            </Button>
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredPosts.map((item) => {
          return (
            <Col key={item.id}>
              <PostCard id={item.id} title={item.title} tags={item.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        show={editTagsModalIsOpen}
        availabelTags={availabelTags}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
    </>
  );
}
function PostCard({ id, title, tags }: PostCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="h-100 text-reset text-decoration-none"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5 text-black">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              className="justify-content-center flex-wrap"
              direction="horizontal"
            >
              {tags.map((tag) => (
                <Badge className="text-reuncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagsModal({ availabelTags, show, handleClose }: EditTagsModal) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ویرایش تگ ها</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availabelTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} />
                </Col>
                <Col xs="auto">
                  <Button variant="outline-none">&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default PostList;
