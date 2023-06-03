import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

import { Unit } from './unit'
import { UnitValuesList } from './withUnitConverter'

interface Props {
  valueFrom: number,
  unitFrom: Unit,
  values: UnitValuesList
}

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
)

export const UnitConverterValuesList: React.FC<Props> = ({ valueFrom, unitFrom, values }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container>
      {values.map(({ value, unit: { abbreviation } }) => (
        <Grid item xs={12} key={abbreviation}>
          <Typography>{`${valueFrom} ${unitFrom.abbreviation}`} = {`${value} ${abbreviation}`}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}
