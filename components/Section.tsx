
interface IProps {
  children: React.ReactNode
  linebreak?: boolean
}

const linebreakStyles = "mt-16 md:mt-20 xl:mt-28"

const Section = ({ children, linebreak = false }: IProps) => (
  <section className={`text-base sm:text-lg font-light leading-relaxed md:w-9/12 text-gray-600 ${linebreak ? linebreakStyles : 'mt-12'}`}>
    {children}
  </section>
)

export default Section