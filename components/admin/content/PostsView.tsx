// components/admin/content/PostsView.tsx
"use client";

import { PostWithAuthor } from "@/types/content";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PostsTable } from "./table/PostsTable";
import { PostsTableFilters } from "./table/PostsTableFilters";
import { PostsTablePagination } from "./table/PostsTablePagination";
import { SortField, SortDirection } from "./table/types";
import { deletePost } from "@/lib/actions/posts";
import { toast } from "sonner";

interface PostsViewProps {
  posts: PostWithAuthor[];
}

export function PostsView({ posts }: PostsViewProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Apply search
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.content?.toLowerCase().includes(searchLower) ||
          post.author?.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (typeFilter !== "ALL") {
      filtered = filtered.filter((post) => post.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((post) => post.status === statusFilter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle null values
      if (aValue === null) aValue = "";
      if (bValue === null) bValue = "";

      // Convert to strings for comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      return sortDirection === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [posts, search, typeFilter, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPosts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPosts, currentPage, itemsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (postId: string) => {
    router.push(`/admin/content/posts/edit/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const result = await deletePost(postId);
        if (result.success) {
          toast.success("Post deleted successfully");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to delete post");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the post");
      }
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search !== "" || typeFilter !== "ALL" || statusFilter !== "ALL";

  return (
    <div className="space-y-0">
      <PostsTableFilters
        itemsPerPage={itemsPerPage}
        search={search}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        hasActiveFilters={hasActiveFilters}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(parseInt(value));
          setCurrentPage(1);
        }}
        onSearchChange={setSearch}
        onTypeFilterChange={setTypeFilter}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={clearFilters}
      />

      <PostsTable
        posts={paginatedPosts}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <PostsTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <div className="text-sm text-gray-500 text-center mt-2 bg-white p-2 rounded-b-lg border-x border-b border-gray-300">
        Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} posts
      </div>
    </div>
  );
}
