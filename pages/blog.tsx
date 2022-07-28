import ArticleCard from '../components/ArticleCart'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Section from '../components/Section'
import { getAllBlogArticles } from '../lib/devto'
import IArticle from '../models/IArticle'

interface IProps {
  articles: IArticle[]
}

const title = "Blog ✍️"
const subtitle = "I share anything that may help others, technologies I\'m using and cool things I\'ve made."

const BlogPage = ({ articles }: IProps) => {
  console.log(articles);

  return (
    <Layout title={title} description={subtitle}>
      <PageTitle
        title={title}
        subtitle={subtitle}
      />

      <Section linebreak>
        {articles.map(({ title, description, publishedAt, tags, canonical }) => (
          <ArticleCard
            key={title}
            title={title}
            description={description}
            date={publishedAt}
            tags={tags}
            canonical={canonical}
          />
        ))}
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get all the articles that have a canonical URL pointed to your blog
  const articles = await getAllBlogArticles();

  // Pass articles to the page via props
  return { props: { articles } };
}

export default BlogPage