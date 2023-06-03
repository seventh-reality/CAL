import { frenchVatCalculator } from '@infinitetoolbox/vat-calculator'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'

import Layout from '../../src/Layout'

import SEO from '../../next-seo.config'

const computeVatNumber = (siretOrSiren: number): string => {
  const vat = frenchVatCalculator(siretOrSiren)
  if (vat instanceof Error) {
    throw vat
  }

  return vat
}

const pageTitle = 'French VAT Number Calculator'
const pageDescription = ''
const pageUrl = `${SEO.siteUrl}/business/vat-number`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    title: {
      margin: theme.spacing(4)
    },

    form: {
      padding: theme.spacing(2)
    },

    textField: {}
  }),
)

function VATNumberPage() {
  const classes = useStyles()

  const [siretOrSiren, setSiretOrSiren] = useState('')
  const [vatNumber, setVATNumber] = useState<string | null>(null)

  const _handleSiretOrSirenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiretOrSiren(e.target.value.trim().replace(/\s/g, ''))
  }

  const _handleComputeClick = () => {
    setVATNumber(computeVatNumber(+siretOrSiren))
  }

  return (
    <Layout>
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

      <Box textAlign="center">
        <Typography className={classes.title} component="h1" variant="h2">
          French VAT Number Calculator
        </Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {vatNumber && (
                  <Card>
                    <Typography variant="h4">
                      VAT
                    </Typography>

                    <Typography variant="subtitle1">
                      {vatNumber}
                    </Typography>
                  </Card>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField className={classes.textField} label="French SIRET or SIREN" variant="outlined" value={siretOrSiren} onChange={_handleSiretOrSirenChange} />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" fullWidth={true} onClick={_handleComputeClick}>Compute</Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Box>
    </Layout>
  )
}

export default VATNumberPage
