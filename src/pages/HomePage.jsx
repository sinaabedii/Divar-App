import { useQuery } from "@tanstack/react-query";
import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";

function HomePage() {
  // It is done for loading the main page and sidebar
  const { data: posts, isLoading: postsLoading } = useQuery(
    ["all-post-list"],
    getAllPosts
  );
  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );

  return (
    <>
      {postsLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
