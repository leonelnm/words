import { getCollection } from "astro:content";

export const getLastPublication = async () => {
  const wordsEntries = await getWordsOrderByDateDesc();

  return {
    params: { slug: '/' },
    props: {
      entry: wordsEntries[0],
      next: wordsEntries[1]
    }
  }
}

export const getPublicationsWithoutFirst = async () => {
  const wordsEntries = await getWordsOrderByDateDesc();
  const entries = wordsEntries.map((entry, index) => {
    return {
      params: { slug: entry.slug },
      props: {
        entry,
        prevIsIndex: index === 1,
        prev: index > 0 ? wordsEntries[index - 1] : undefined,
        next: index < wordsEntries.length - 1 ? wordsEntries[index + 1] : undefined
      }
    }
  });
  return entries.slice(1);
}

const getWordsOrderByDateDesc = async () => {
  const wordsEntries = await getCollection("words", ({ data }) => !data.isDraft);
  return wordsEntries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}