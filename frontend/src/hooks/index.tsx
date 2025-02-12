import { useEffect, useState } from "react";
import axios from "axios"; // ✅ No need for AxiosResponse import
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    };
}

// ✅ Fetch a single blog by ID
export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<{ blog: Blog }>( // ✅ Fixed Type
                    `${BACKEND_URL}/api/v1/blog/${id}`,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                );
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return { loading, blog };
};

// ✅ Fetch all blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<{ blogs: Blog[] }>( // ✅ Fixed Type
                    `${BACKEND_URL}/api/v1/blog/bulk`,
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    }
                );
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { loading, blogs };
};
