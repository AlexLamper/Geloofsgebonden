"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BookOpen, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PostType = "GEBED" | "DANK" | "VRAAG";

export type FeedPost = {
  _id: string;
  content: string;
  type: PostType;
  authorPseudonym: string;
  scriptureReference?: string | null;
  scriptureText?: string | null;
  upvotes: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export function CreatePostDialog({
  onCreated,
}: {
  onCreated: (post: FeedPost) => void;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<PostType>("GEBED");
  const [scriptureReference, setScriptureReference] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchScripture(ref: string) {
    if (!ref) return;
    try {
      const resp = await fetch(`https://api.scriptura.dev/v1/bible/nld/nlg/search?query=${encodeURIComponent(ref)}`);
      if (resp.ok) {
        // Mock handling as api.scriptura.dev might need key or different endpoint
        // Assuming user just wants to input reference for now or we fake lookup
        // Ideally we would setScriptureText(data.text);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const addHashtag = () => {
    if (hashtag && !hashtags.includes(hashtag)) {
      setHashtags([...hashtags, hashtag.replace(/^#/, '')]);
      setHashtag("");
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          type,
          scriptureReference: scriptureReference.trim() || undefined,
        }),
      });

      const data = (await response.json()) as {
        post?: FeedPost;
        error?: string;
      };

      if (!response.ok || !data.post) {
        throw new Error(data.error ?? "Er ging iets mis bij plaatsen.");
      }

      onCreated({
        ...data.post,
        _id: String(data.post._id),
      });

      setContent("");
      setType("GEBED");
      setScriptureReference("");
      setOpen(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Onbekende fout opgetreden."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed right-6 bottom-6 z-20 h-14 rounded-full px-6 text-base shadow-lg hover:cursor-pointer">
          Deel je hart
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deel je hart</DialogTitle>
          <DialogDescription>
            Deel anoniem je gebedspunt, dankpunt of vraag.
          </DialogDescription>
        </DialogHeader>
        {!session?.user ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm text-muted-foreground">
              Om iets te plaatsen moet je eerst inloggen of een account aanmaken.
            </p>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/inloggen">Inloggen</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/registreren">Registreren</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <select
            value={type}
            onChange={(event) => setType(event.target.value as PostType)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="GEBED">Gebed</option>
            <option value="DANK">Dank</option>
            <option value="VRAAG">Vraag</option>
          </select>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={500}
            required
            placeholder="Schrijf hier wat op je hart ligt..."
            className="min-h-32 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />

          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
               <BookOpen className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
               <input
                value={scriptureReference}
                onChange={(event) => setScriptureReference(event.target.value)}
                onBlur={() => fetchScripture(scriptureReference)}
                placeholder="Bijbeltekst (bijv. Johannes 3:16)"
                className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm"
              />
            </div>
            <div className="relative flex-1">
               <Hash className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
               <input
                value={hashtag}
                onChange={(event) => setHashtag(event.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                placeholder="Hashtag toevoegen"
                className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          {hashtags.length > 0 && (
             <div className="flex flex-wrap gap-1">
               {hashtags.map(tag => (
                 <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">#{tag}</span>
               ))}
             </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{content.length}/500</span>
            <Button disabled={loading || !content.trim()} type="submit">
              {loading ? "Plaatsen..." : "Plaatsen"}
            </Button>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
