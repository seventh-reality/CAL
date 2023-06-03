import { NextSeo } from 'next-seo'
import React from 'react'

import Layout from '../src/Layout'

import SEO from '../next-seo.config'

const pageTitle = 'Home'
const pageDescription = ''
const pageUrl = `${SEO.siteUrl}/`

export default function Index() {
  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        openGraph={{
          url: pageUrl,
          title: pageTitle,
          description: pageDescription,
        }}
      />

      <Layout>
        Home
      </Layout>
    </>
  );
}
