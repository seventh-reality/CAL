import bmiCalculator from '@infinitetoolbox/bmi-calculator'
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

const computeBmi = (mass: number, height: number): number => bmiCalculator(mass, height / 100)

const defaultMass = 60
const defaultHeight = 180
const defaultBmi = computeBmi(defaultMass, defaultHeight)

const pageTitle = 'BMI Calculator'
const pageDescription = ''
const pageUrl = `${SEO.siteUrl}/health/bmi`

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

function BmiPage() {
  const classes = useStyles()

  const [mass, setMass] = useState(defaultMass)
  const [height, setHeight] = useState(defaultHeight)
  const [bmi, setBMI] = useState(defaultBmi)

  const _handleComputeClick = () => {
    setBMI(computeBmi(mass, height))
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
          BMI Calculator
        </Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <Typography variant="h4">
                    BMI
                  </Typography>

                  <Typography variant="subtitle1">
                    {bmi.toPrecision(4)}
                  </Typography>
                  <Typography color="textSecondary">
                    kg/m2
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <TextField className={classes.textField} label="Mass (in kg)" variant="outlined" value={mass} onChange={e => setMass(+e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField className={classes.textField} label="Height (in cm)" variant="outlined" value={height} onChange={e => setHeight(+e.target.value)} />
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

export default BmiPage
