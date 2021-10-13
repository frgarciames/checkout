import React, { useEffect, useState } from 'react'

import HomepageFeatures from '../components/HomepageFeatures'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import { ServiceCheckout } from '@finetwork/checkout'
import clsx from 'clsx'
import styles from './index.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const checkout = new ServiceCheckout({
  storage: localStorage,
})

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/install"
          >
            Getting started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const [checkoutData, setCheckoutData] = useState<any>(() => ({
    shippingAddress: checkout.shippingAddress,
    client: checkout.client,
    offers: Array.from(checkout.offers.values()),
  }))
  useEffect(() => {
    const onCheckoutChange = (data) => {
      console.log(data)
      // const { shippingAddress, client, offers } = checkout
      // setCheckoutData({
      //   shippingAddress,
      //   client,
      //   offers: Array.from(offers.values()),
      // })
    }
    ServiceCheckout.events.on('clientChange', onCheckoutChange)
    ServiceCheckout.events.on('offersChange', onCheckoutChange)
    ServiceCheckout.events.on('shippingAddressChange', onCheckoutChange)
    return () => {
      ServiceCheckout.events.off('clientChange', onCheckoutChange)
      ServiceCheckout.events.off('offersChange', onCheckoutChange)
      ServiceCheckout.events.off('shippingAddressChange', onCheckoutChange)
    }
  }, [])
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures />   */}</main>
    </Layout>
  )
}
