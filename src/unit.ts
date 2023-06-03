/**
 * Unit class.
 */
export class Unit {
  /**
   * Name attribute.
   *
   * @var {string} name
   */
  public name: string

  /**
   * Abbreviation attribute.
   *
   * @var {string} abbreviation
   */
  public abbreviation: string

  /**
   * Creates an instance of Unit.
   *
   * @param name unit name
   * @param abbreviation unit abbreviation
   * @param [value=null] optional unit value number
   */
  public constructor(name: string, abbreviation: string) {
    this.name = name
    this.abbreviation = abbreviation
  }
}
