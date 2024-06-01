import { getCollection } from "astro:content";

export const getLastPublication = async () => {
  const wordsEntries = await getWordsOrderByDateDesc();

  return {
    entry: wordsEntries[0]
  }
}

export const getPublicationsWithoutFirst = async () => {
  const wordsEntries = await getWordsOrderByDateDesc();
  return wordsEntries.map((entry, index) => {
    return {
      params: { slug: entry.slug },
      props: {
        entry,
        prev: index > 0 ? wordsEntries[index - 1] : undefined,
        next: index < wordsEntries.length - 1 ? wordsEntries[index + 1] : undefined
      }
    }
  });
}

const getWordsOrderByDateDesc = async () => {
  const wordsEntries = await getCollection("words", ({ data }) => !data.isDraft);
  return wordsEntries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const showDate = (date: Date) => {
  return date.toLocaleString("es-es", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};