import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/user";
import Loader from "../modules/Loader";
import { sp } from "../../utils/numbers";

function PostList() {
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="px-4 py-3 border-b-2 border-red-800 w-fit pb-1">
            آگهی های شما
          </h3>
          {data.data.posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center border-2 w-36 text-center border-gray-300 rounded-md mx-3 my-0 p-1"
            >
              <img
                src={`${baseURL}${post.images[0]}`}
                className="w-24 h-16 rounded ml-7 "
              />
              <div className="w-full">
                <p className="text-sm">{post.options.title}</p>
                <span className="text-xs text-gray-400">
                  {post.options.content}
                </span>
              </div>
              <div className="w-36 text-center">
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
