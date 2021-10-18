import React, { useEffect, useState } from 'react'

import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import styles from './index.module.css'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useServiceCheckout } from '@finetwork/checkout-react'

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
  const { checkout, state } = useServiceCheckout()
  useEffect(() => {
    // checkout.addOffer({
    //   id: 32,
    //   promotionId: 72,
    //   products: [
    //     {
    //       dtype: 'orderlinephoneline',
    //       mandatory: true,
    //       id: 500105,
    //       providerId: 1,
    //       operationType: 3,
    //       convergenceId: 227,
    //     },
    //     {
    //       convergenceId: 218,
    //       dtype: 'orderlineinsurance',
    //       mandatory: false,
    //       id: 500088,
    //       providerId: 5,
    //       enabled: false,
    //     },
    //   ],
    // })
    // checkout.shippingAddress = {
    //   door: '2',
    //   floor: '3',
    //   city: 'VAL',
    //   street: 'VALENCIA',
    //   number: 3,
    //   cp: '0232',
    //   province: {
    //     id: 5,
    //     name: 'VALENCIA',
    //     value: 'VALENCIA',
    //     zone: 'ZON3',
    //   },
    //   streetType: {
    //     id: '1',
    //   },
    // }
  }, [])
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/* <button
        onClick={() => {
          checkout.client = {
            birthDate: '14-10-2003',
            email: 'adsfa@adsfasd.com',
            surname: 'sadf',
            iban: 'ES1031771437733160732400',
            identificationDocument: '15805063S',
            identificationType: 'DNI',
            name: 'asdf',
            phone: '666565656',
            secondSurname: 'asdf',
            billingAddress: {
              door: '2',
              floor: '23',
              city: 'elche',
              street: 'alicante',
              number: 23,
              cp: '2323',
              province: {
                id: 5,
                name: 'VALENCIA',
                zone: 'Zona 1',
                value: 'VALENCIA',
              },
              streetType: {
                id: '2',
              },
            },
          }
        }}
      >
        Add client
      </button>
      <button
        onClick={() => {
          const data = checkout.createClient(
            ({
              surname,
              secondSurname,
              billingAddress: {
                door,
                floor,
                city,
                street,
                number,
                cp,
                province,
                streetType,
              },
              ...rest
            }) => ({
              firstlastname: surname,
              secondlastname: secondSurname,
              operator: {
                id: 1,
              },
              billingAddress: {
                streetType,
                street,
                number,
                floor,
                door,
                cp,
                city,
                province,
              },
              ...rest,
            })
          )
        }}
      >
        Create client
      </button>
      <button
        onClick={() => {
          checkout.createOrder(979361)
        }}
      >
        Create order
      </button> */}
      <main>{/* <HomepageFeatures />   */}</main>
    </Layout>
  )
}
