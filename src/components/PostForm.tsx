import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { PostData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type PostFormProps = {
  onSubmit: (data: PostData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
function PostForm({ onSubmit, onAddTag, availableTags }: PostFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: titleRef.current!.value,
      tags: selectedTag,
    });
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
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
              <CreatableSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTag(prev => [...prev, newTag]);
                }}
                options={availableTags.map(item => {
                  return { label: item.label, id: item.id };
                })}
                placeholder="انتخاب"
                isMulti
                value={selectedTag.map(item => {
                  return {
                    label: item.label,
                    id: item.id,
                  };
                })}
                onChange={items => {
                  setSelectedTag(
                    items.map(item => {
                      return { label: item.label, id: item.id };
                    })
                  );
                }}
              />
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
