import React from "react"
import AdditionGame from "../components/AdditionGame"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Addition game" />
    <AdditionGame />
  </Layout>
)

export default IndexPage
