import { unit as mathUnit } from 'mathjs'
import React from 'react'

import { Unit } from './unit'

interface Options {
  unitsListEnabled: boolean
}

interface Props { }
interface State {
  unitFrom: Unit,
  unitTo: Unit,
  valueFrom: number,
  valueTo: number

  valuesList: UnitValuesList
}

export interface WithUnitConverterComponentProps {
  units: Unit[],
  invert: Function,
  setUnitFrom: UnitSetter,
  unitFrom: Unit,
  setUnitTo: UnitSetter,
  unitTo: Unit,
  setValueFrom: ValueSetter,
  valueFrom: number,
  valueTo: number
  valuesList: UnitValuesList
}

export type UnitValuesList = Array<{ value: number, unit: Unit }>
export type ValueSetter = (value: number) => void
export type UnitSetter = (unit: Unit) => void

const defaultOptions: Options = {
  unitsListEnabled: false
}

export const withUnitConverter = <P extends object>(Component: React.ComponentType<WithUnitConverterComponentProps>, units: Unit[] = [], options: Options = defaultOptions) =>
  /**
   * Converter service class.
   */
  class UnitConvert extends React.Component<P & Props, State> {
    constructor(props: P & Props) {
      super(props)

      const unitFrom = units[0]
      const unitTo = units[1]
      const valueFrom = 1
      const { valueTo, valuesList } = this._convert(unitFrom, unitTo, valueFrom, units)

      this.state = {
        unitFrom,
        unitTo,
        valueFrom,
        valueTo,
        valuesList
      }
    }

    /**
     * Convert with unit and number attributes.
     *
     * @param {Unit} unitFrom
     * @param {Unit} unitTo
     * @param {number} valueFrom
     * @return {number}
     */
    private _convertOne(unitFrom: Unit, unitTo: Unit, valueFrom: number): number {
      const from = mathUnit(valueFrom, unitFrom.abbreviation)
      const to = from.toNumber(unitTo.abbreviation)

      return to
    }

    /**
     * Convert with multiple units.
     *
     * @param {Unit} unitFrom
     * @param {Unit[]} unitsTo
     * @param {number} valueFrom
     * @return {UnitValuesList>}
     */
    private _convertMany(unitFrom: Unit, unitsTo: Unit[], valueFrom: number): UnitValuesList {
      const from = mathUnit(valueFrom, unitFrom.abbreviation)
      const valuesList = unitsTo.filter(({ abbreviation }) => abbreviation !== unitFrom.abbreviation).map(unit => ({
        value: from.toNumber(unit.abbreviation),
        unit
      }))
      
      return valuesList
    }

    /**
     * Convert with one unit or multiple ones depending on if the unitsListEnabled is true or false.
     *
     * @param {Unit} unitFrom 
     * @param {Unit} unitTo 
     * @param {number} valueFrom 
     * @param {Unit[]} units
     * @return { valueTo: number, valuesList: UnitValuesList }
     */
    private _convert(unitFrom: Unit, unitTo: Unit, valueFrom: number, units: Unit[] = []): { valueTo: number, valuesList: UnitValuesList } {
      const { unitsListEnabled } = options
      const valueTo = this._convertOne(unitFrom, unitTo, valueFrom)
      let valuesList: UnitValuesList = []
      if (unitsListEnabled) {
        valuesList = this._convertMany(unitFrom, units, valueFrom)
      }

      return {
        valueTo,
        valuesList
      }
    }

    /**
     * Changed unit from event handler.
     *
     * @param {Unit} unit to convert
     */
    protected handleUnitFromChange = (unit: Unit) => {
      this.setState({
        unitFrom: unit
      }, () => this.handleChange())
    }

    /**
     * Changed value from event handler.
     *
     * @param {number} value to convert
     */
    protected handleValueFromChange = (value: number) => {
      this.setState({
        valueFrom: value
      }, () => this.handleChange())
    }

    /**
     * Changed unit to event handler.
     *
     * @param {Unit} unit target
     */
    protected handleUnitToChange = (unit: Unit) => {
      this.setState({
        unitTo: unit
      }, () => this.handleChange())
    }

    /**
     * Invert units from and units to.
     */
    protected invert = () => {
      const { unitFrom, unitTo, valueFrom, valueTo } = this.state
      this.setState({
        unitFrom: unitTo,
        unitTo: unitFrom,
        valueFrom: valueTo,
        valueTo: valueFrom
      }, () => this.handleChange())
    }

    /**
     * Unit or value change handler.
     */
    protected handleChange = () => {
      const { unitFrom, unitTo, valueFrom } = this.state
      const { valueTo, valuesList } = this._convert(unitFrom, unitTo, valueFrom, units)

      this.setState({
        valueTo,
        valuesList
      })
    }

    render() {
      const { unitFrom, unitTo, valueFrom, valueTo, valuesList } = this.state

      return (
        <Component
          units={units}
          invert={this.invert}
          setUnitFrom={this.handleUnitFromChange}
          unitFrom={unitFrom}
          setUnitTo={this.handleUnitToChange}
          unitTo={unitTo}
          setValueFrom={this.handleValueFromChange}
          valueFrom={valueFrom}
          valueTo={valueTo}
          valuesList={valuesList}
        />
      )
    }
  }
