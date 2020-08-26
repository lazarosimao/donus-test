export class Calculate {
  protected PERCENTAGE_RATE: number = 0.010;
  protected PERCENTAGE_BONUS: number = 0.005;

  bonus(amount: number): number {
    let result = amount * this.PERCENTAGE_BONUS;
    return parseFloat(result.toFixed(2));
  }

  rate(amount: number): number {
    let result = amount * this.PERCENTAGE_RATE;
    return parseFloat(result.toFixed(2));
  }
}