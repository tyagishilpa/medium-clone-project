import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
            {blogs?.filter(Boolean).map(blog => (<BlogCard
                key={blog?.id || Math.random()}  // Ensure unique key
                id={blog?.id }
                authorName={blog?.author?.name || "anonymous"}  
                title={blog?.title || "Untitled"}
                content={blog?.content || "No content available"}
                publishedDate={"2nd Feb 2024"}
            />
        ))}

            </div>
        </div>
    </div>
}