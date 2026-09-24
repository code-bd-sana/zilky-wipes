"use client";

import { useMemo, useState } from "react";
import HelpTitle from "./help-title";
import FaqCategory from "./faq-category";
import HaveQuestions from "./have-questions";

export type TopicQuestion = {
  id?: string;
  question: string;
  answer: string;
};

export type Topic = {
  name?: string;
  questions?: TopicQuestion[];
};

type FaqClientProps = {
  heroData?: Record<string, unknown>;
  topics: Topic[];
  ctaData?: Record<string, unknown>;
};

export default function FaqClient({ heroData, topics, ctaData }: FaqClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return topics;

    return topics
      .map((topic) => {
        const topicNameMatches = topic.name?.toLowerCase().includes(q);
        const matchingQuestions = (topic.questions || []).filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        );

        if (topicNameMatches) {
          return topic;
        }

        if (matchingQuestions.length > 0) {
          return {
            ...topic,
            questions: matchingQuestions,
          };
        }

        return null;
      })
      .filter((t): t is Topic => t !== null);
  }, [topics, searchQuery]);

  return (
    <>
      <HelpTitle
        data={heroData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredTopics.length > 0 ? (
        filteredTopics.map((topic, index) => (
          <FaqCategory
            key={topic.name || index}
            data={topic}
            isSearching={Boolean(searchQuery.trim())}
          />
        ))
      ) : (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-center">
          <div className="bg-[#FBFAF9] border border-gray-200/80 rounded-2xl p-8 sm:p-10 shadow-2xs">
            <p className="text-base sm:text-lg font-semibold text-(--text-primary)">
              No questions found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-(--text-secondary) mt-1.5">
              Try searching with different keywords, or check our categories below.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-5 py-2 text-xs sm:text-sm font-medium bg-(--text-primary) text-white rounded-full hover:bg-[#142e50] transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        </section>
      )}

      <HaveQuestions data={ctaData} />
    </>
  );
}
