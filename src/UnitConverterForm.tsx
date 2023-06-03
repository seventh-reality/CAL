import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import React from 'react'

import { UnitSetter, WithUnitConverterComponentProps } from './withUnitConverter'

interface Props extends Pick<WithUnitConverterComponentProps, 'invert' | 'setUnitFrom' | 'setUnitTo' | 'setValueFrom' | 'units' | 'unitFrom' | 'unitTo' | 'valueFrom' | 'valueTo'> { }

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

export const UnitConvertForm: React.FC<Props> = ({ invert, setUnitFrom, setUnitTo, setValueFrom, units, unitFrom, unitTo, valueFrom, valueTo }) => {
  const classes = useStyles()

  const _handleValueFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setValueFrom(+e.target.value)
  }
  const _handleUnitChange = (setter: UnitSetter) => (e: React.ChangeEvent<{ name?: string | undefined, value: unknown }>) => {
    e.preventDefault()

    const index = units.findIndex(({ abbreviation }) => abbreviation === e.target.value)
    if (index === -1) {
      return
    }

    setter(units[index])
  }

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <FormControl variant="filled">
              <FormGroup row={true}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="filled-age-native-simple">{`${unitFrom.name} (${unitFrom.abbreviation})`}</InputLabel>

                  <Input
                    className={classes.textField}
                    value={valueFrom}
                    type="number"
                    onChange={_handleValueFromChange}
                    endAdornment={<InputAdornment position="end">{unitFrom.abbreviation}</InputAdornment>}
                  />

                  <Select
                    native
                    value={unitFrom.abbreviation}
                    onChange={_handleUnitChange(setUnitFrom)}
                    inputProps={{
                      name: 'age',
                      id: 'filled-age-native-simple',
                    }}
                  >
                    {units.filter(({ abbreviation }) => abbreviation !== unitTo.abbreviation).map(({ abbreviation, name }) => (
                      <option value={abbreviation} key={abbreviation}>{name}</option>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <IconButton onClick={() => invert()} aria-label="invert">
              <SwapHorizIcon />
            </IconButton>
          </Grid>

          <Grid item xs={5}>
            <FormControl variant="filled">
              <FormGroup row={true}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="filled-age-native-simple">{`${unitTo.name} (${unitTo.abbreviation})`}</InputLabel>

                  <Input
                    className={classes.textField}
                    value={valueTo}
                    type="number"
                    endAdornment={<InputAdornment position="end">{unitTo.abbreviation}</InputAdornment>}
                    disabled
                  />

                  <Select
                    native
                    value={unitTo.abbreviation}
                    onChange={_handleUnitChange(setUnitTo)}
                    inputProps={{
                      name: 'age',
                      id: 'filled-age-native-simple',
                    }}
                  >
                    {units.filter(({ abbreviation }) => abbreviation !== unitFrom.abbreviation).map(({ abbreviation, name }) => (
                      <option value={abbreviation} key={abbreviation}>{name}</option>
                    ))}
                  </Select>
                </FormControl>
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </form>
  )
}
