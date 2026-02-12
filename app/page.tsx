import { Feed } from "@/components/feed";
import { connectToDatabase } from "@/lib/db";
import { mockPosts } from "@/src/lib/mock-posts";
import { fetchDayText } from "@/src/lib/scriptura";
import Post from "@/src/models/Post";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dailyVerse = await fetchDayText();

  let posts: {
    _id: string;
    content: string;
    type: "GEBED" | "DANK" | "VRAAG";
    authorPseudonym: string;
    scriptureReference?: string | null;
    scriptureText?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    upvotes: string[];
    createdAt: string;
  }[] = [];

  try {
    await connectToDatabase();
    const dbPosts = await Post.find({ status: { $in: ["PENDING", "APPROVED"] } })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    posts = dbPosts.map((post) => ({
      _id: post._id.toString(),
      content: post.content,
      type: post.type,
      authorPseudonym: post.authorPseudonym,
      scriptureReference: post.scriptureReference ?? null,
      scriptureText: post.scriptureText ?? null,
      status: post.status,
      upvotes: (post.upvotes ?? []).map((upvoteId) => upvoteId.toString()),
      createdAt: post.createdAt.toISOString(),
    }));
  } catch {
    posts = mockPosts;
  }

  if (posts.length === 0) {
    posts = mockPosts;
  }

  return (
    <main>
      <Feed initialPosts={posts} dailyVerse={dailyVerse} />
    </main>
  );
}
