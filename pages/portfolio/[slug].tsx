import fs from 'fs';
import path from 'path';
import { FaDev } from 'react-icons/fa';
import DevToCallToAction from '../../components/DevToCallToAction';
import Layout from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import { getAllPortfolioArticles, getArticleFromCache } from '../../lib/devto';
import IArticle from '../../models/IArticle';

const cacheFile = '.dev-to-cache-portfolio.json';

interface IProps {
  article: IArticle
}

const ArticlePage = ({ article }: IProps): JSX.Element => (
  <Layout title={article.title} description={article.description}>
    <PageTitle title={article.title} center icons={false} />
    <section className="mt-10 font-light leading-relaxed w-full flex flex-col items-center">
      <article
        className="prose dark:prose-dark lg:prose-lg w-full md:w-5/6 xl:w-9/12"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
      <DevToCallToAction href={article.devToURL} />
    </section>
  </Layout>
)

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const cacheContents = fs.readFileSync(path.join(process.cwd(), cacheFile), 'utf-8');
  const cache = JSON.parse(cacheContents);
  const article: IArticle = await getArticleFromCache(cache, params.slug);
  return { props: { article } }
}

export async function getStaticPaths() {
  const articles: IArticle[] = await getAllPortfolioArticles()
  fs.writeFileSync(path.join(process.cwd(), cacheFile), JSON.stringify(articles))

  const paths = articles.map(({ slug }: any) => {
    return {
      params: { slug },
    }
  })

  return { paths, fallback: false }
}

export default ArticlePage