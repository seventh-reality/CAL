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
  new Unit('meter', 'm'),
  new Unit('inch', 'in'),
  new Unit('foot', 'ft'),
  new Unit('yard', 'yd'),
  new Unit('mile', 'mi'),
  new Unit('link', 'li'),
  new Unit('rod', 'rod'),
  new Unit('chain', 'ch'),
  new Unit('angstrom', 'angstrom'),
  new Unit('mil', 'mil')
]

const pageTitle = 'Length converter'
const pageDescription = ''
const pageUrl = `${SEO.siteUrl}/converters/length`

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

const LengthPage: React.FC<Props> = ({ valueFrom, unitFrom, valuesList, ...props }) => {
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

export default withUnitConverter(LengthPage, units, { unitsListEnabled: true })
