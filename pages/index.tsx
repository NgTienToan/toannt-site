/* eslint-disable react/no-unescaped-entities */
import ArticleCard from '../components/ArticleCart'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Section from '../components/Section'
import { getAllBlogArticles, getAllPortfolioArticles } from '../lib/devto'
import IArticle from '../models/IArticle'

interface IProps {
  article: IArticle
  project: IArticle
}

const title = "Hello, I'm Toannt 👋"
const subtitle = "I\'m a software developer working at VNPAY, and living in Ha Noi, VietNam."

const IndexPage = ({ article, project }: IProps) => {
  return (
    <Layout title="Home 👋" description={`${title} - ${subtitle}`}>
      <PageTitle
        title={title}
        subtitle={subtitle}
      />

      <Section linebreak>
        <h2 className="text-3xl md:text-4xl mb-4 text-black">About</h2>
        <p className="my-2">
          I'm a Software Engineering. I'm a graduate of the VNU University of Engineering and Technology.
        </p>
        <p>
          Now, I currently a front-end web developer. The programming language I most hated and also I most interest is Javascript, is so cool, so flexible but is have a ton of anomaly.
        </p>
      </Section>
      <Section>
        <h2 className="text-3xl md:text-4xl mb-4 text-black">Latest article</h2>
        <ArticleCard
          title={article.title}
          description={article.description}
          date={article.publishedAt}
          tags={article.tags}
          canonical={article.canonical}
        />

        <h2 className="text-3xl md:text-4xl mb-4 text-black">Latest project</h2>
        <ArticleCard
          title={project.title}
          description={project.description}
          date={project.publishedAt}
          tags={project.tags}
          canonical={project.canonical}
          portfolio
          coverImage={project.coverImage}
        />
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const [article] = await getAllBlogArticles();
  const [project] = await getAllPortfolioArticles();
  return { props: { article, project } };
}

export default IndexPage