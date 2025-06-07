import ArticleDetailsPage from "@/components/articles/ArticlesDetails";
import RecommendedArticles from "@/components/NewsPart/RecommendedAritcles";

export async function generateStaticParams() {
  // Return some static params for build time
  // In production, you'd fetch real article IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

function ArticlePage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <ArticleDetailsPage articleId={id} />
      <RecommendedArticles />
    </div>
  );
}

export default ArticlePage;
