import { PostData } from "../App";
import PostForm from "./PostForm";

type AddPostProps = {
  onSubmit: (data: PostData) => void;
};
function AddPost({ onSubmit }: AddPostProps) {
  return (
    <>
      <h2>appPost</h2>
      <PostForm onSubmit={onSubmit} />
    </>
  );
}

export default AddPost;
