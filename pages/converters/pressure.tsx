import Box from '@material-ui/core/Box'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { NextSeo } from 'next-seo'
import React from 'react'

import { Unit } from '../../src/unit'
import { withUnitConverter, WithUnitConverterComponentProps } from '../../src/withUnitConverter'
import { UnitConvertForm } from '../../src/UnitConverterForm'
import { UnitConverterValuesList } from '../../src/UnitConverterValuesList'
import Layout from '../../src/Layout'

import SEO from '../../next-seo.config'

interface Props extends WithUnitConverterComponentProps { }

const units: Unit[] = [
  new Unit('Pa', 'Pa'),
  new Unit('psi', 'psi'),
  new Unit('atm', 'atm'),
  new Unit('torr', 'torr'),
  new Unit('bar', 'bar'),
  new Unit('mmHg', 'mmHg'),
  new Unit('mmH2O', 'mmH2O'),
  new Unit('cmH2O', 'cmH2O')
]

const pageTitle = 'Pressure converter'
const pageDescription = ''
const pageUrl = `${SEO.siteUrl}/converters/pressure`

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

const PressurePage: React.FC<Props> = ({ valueFrom, unitFrom, valuesList, ...props }) => {
  const classes = useStyles()

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
          {pageTitle}
        </Typography>

        <UnitConvertForm valueFrom={valueFrom} unitFrom={unitFrom} {...props} />
        <UnitConverterValuesList valueFrom={valueFrom} unitFrom={unitFrom} values={valuesList} />
      </Box>
    </Layout>
  )
}

export default withUnitConverter(PressurePage, units, { unitsListEnabled: true })
