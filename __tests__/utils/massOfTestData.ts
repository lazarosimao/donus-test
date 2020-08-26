function toCalculateOfBonus(): any {
  return [
    {
      testThatValue: 10.00,
      expectadValue: 0.05
    },
    {
      testThatValue: 16.00,
      expectadValue: 0.08
    },
    {
      testThatValue: 1000.00,
      expectadValue: 5.00
    },
    {
      testThatValue: 100.43,
      expectadValue: 0.50
    },
    {
      testThatValue: 1.49,
      expectadValue: 0.01
    },
  ]
}

function toCalculateOfRate(): any {
  return [
    {
      testThatValue: 10.00,
      expectadValue: 0.10
    },
    {
      testThatValue: 16.00,
      expectadValue: 0.16
    },
    {
      testThatValue: 1000.00,
      expectadValue: 10.00
    }
  ]
}
 
export { toCalculateOfBonus, toCalculateOfRate };