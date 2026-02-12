"use client";

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Heart,
  Search,
  Share2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreatePostDialog, FeedPost } from "@/components/create-post-dialog";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const filterTags = [
  "#Bijbelstudie",
  "#Gebedsverzoek",
  "#Dankbaarheid",
  "#Getuigenis",
  "#Geloofsvragen",
];

const categories = [
  "Gebed", "Dankzegging", "Vragen",
  "Bijbelstudie", "Persoonlijk", "Getuigenis",
  "Ondersteuning", "Discussie", "Nieuws"
];

const recommendedFollows = [
  { name: "Evangeliste Eva", id: "eva" },
  { name: "Broeder Johannes", id: "johannes" },
];

export function Feed({
  initialPosts,
  dailyVerse,
}: {
  initialPosts: FeedPost[];
  dailyVerse?: {
    reference: string;
    text: string;
  } | null;
}) {
  useSession();
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);
  const [tab, setTab] = useState("for-you");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = posts;
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((post) => 
        post.content.toLowerCase().includes(lower) || 
        post.authorPseudonym.toLowerCase().includes(lower)
      );
    }
    return result;
  }, [posts, search]);

  const regularPosts = filtered;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      
      {/* Middle Column */}
      <div className="space-y-6">
        <h1 className="sr-only">Geloofsgebonden Feed - Christelijke Gebeden en Vragen</h1>
        
        {/* Search & Tabs Row */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 mt-0.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Zoeken in berichten..." 
                className="h-12 w-full rounded-2xl border-none bg-white pl-12 shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <CreatePostDialog
                onCreated={(post) => {
                  setPosts((prev) => [post, ...prev]);
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {filterTags.map(tag => (
              <Badge key={tag} variant="secondary" className="rounded-full bg-white px-4 py-1.5 font-medium text-zinc-600 border border-zinc-100 hover:bg-zinc-50 cursor-pointer hover:cursor-pointer shadow-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-start gap-12 border-b border-zinc-200 pt-4 px-2">
             {[
               { id: "for-you", label: "Voor Jou" },
               { id: "trending", label: "Populair" },
               { id: "following", label: "Volgend" }
             ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "relative pb-3 text-sm font-semibold transition-colors hover:cursor-pointer",
                    tab === t.id ? "text-primary" : "text-zinc-400 hover:text-zinc-600"
                  )}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                    />
                  )}
                </button>
             ))}
          </div>
        </div>

        {/* Regular Posts List */}
        <div className="space-y-6">
           {regularPosts.map((post) => (
             <Card key={post._id} className="overflow-hidden rounded-3xl border-none bg-white p-6 shadow-sm transition-all hover:shadow-md hover:cursor-pointer">
                <div className="flex gap-6">
                   <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorPseudonym}`} />
                          <AvatarFallback>{post.authorPseudonym[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-zinc-900">{post.authorPseudonym} • {post.type}</span>
                      </div>
                      <h3 className="text-lg font-bold leading-tight text-zinc-900">
                        {post.content}
                      </h3>
                      {post.scriptureReference && (
                        <div className="rounded-xl bg-primary/5 p-3 border border-primary/10 italic text-sm text-zinc-600">
                          <strong>{post.scriptureReference}:</strong> {post.scriptureText}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                         <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {new Date(post.createdAt).toLocaleDateString('nl-NL')}</span>
                            <span className="flex items-center gap-1.5"><Heart className="size-3.5" /> {post.upvotes?.length || 0} Gebeden</span>
                         </div>
                         <div className="flex gap-1">
                           <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:text-primary hover:cursor-pointer">
                              <Heart className="size-4" />
                           </Button>
                           <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:cursor-pointer">
                              <Share2 className="size-4" />
                           </Button>
                         </div>
                      </div>
                   </div>
                </div>
             </Card>
           ))}
        </div>

      </div>

      {/* Right Column */}
      <aside className="space-y-8">
        
        {/* Daily Verse / Scripture Focus */}
        {dailyVerse && (
          <div className="rounded-3xl bg-white px-6 py-6 text-amber-900 shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-3 text-amber-900/60">
                <BookOpen className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Dagtekst</span>
             </div>
             <p className="font-serif italic text-lg leading-relaxed text-amber-950">
               “{dailyVerse.text}”
             </p>
             <p className="mt-3 text-right text-xs font-bold text-amber-900/80">
                — {dailyVerse.reference}
             </p>
          </div>
        )}

        {/* Categories */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-zinc-100">
           <h3 className="mb-4 text-lg font-bold text-zinc-900">Categorieën</h3>
           <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge key={cat} variant="outline" className="rounded-full border-zinc-200 bg-transparent px-3 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all cursor-pointer">
                  {cat}
                </Badge>
              ))}
           </div>
           <Button variant="ghost" className="mt-4 h-auto p-0 text-xs font-bold text-primary hover:no-underline underline-offset-4 decoration-primary/30">
             Bekijk Alle Categorieën
           </Button>
        </div>

        {/* Recommended Follows */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-zinc-100">
           <h3 className="mb-6 text-lg font-bold text-zinc-900">Community Leden</h3>
           <div className="space-y-5">
              {recommendedFollows.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Avatar className="size-9 bg-primary/10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold text-zinc-900">{user.name}</span>
                   </div>
                   <Button size="sm" variant="outline" className="h-8 rounded-full border-zinc-200 text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all">
                     Volgen +
                   </Button>
                </div>
              ))}
           </div>
        </div>

      </aside>

    </div>
  );
}
