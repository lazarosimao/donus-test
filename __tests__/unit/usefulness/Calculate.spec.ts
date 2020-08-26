import { Calculate } from "@src/usefulness/Calculate";
import { toCalculateOfBonus, toCalculateOfRate } from "@test/utils/massOfTestData";

let calculate: Calculate;
describe('Calculate', () => { 
  beforeAll(async () => {
    calculate = new Calculate();
  });
  
  it('Should return a series of valid bonus calculations', async () => {
    const testBonus = toCalculateOfBonus();
    
    for (let index in testBonus) { 
      let test = testBonus[index];
      let result = calculate.bonus(test.testThatValue);
      expect(result).toBe(test.expectadValue);
    }
  });

  it('Should return a series of valid rate calculations', async () => {
    const testRate = toCalculateOfRate();
    
    for (let index in testRate) { 
      let test = testRate[index];
      let result = calculate.rate(test.testThatValue);
      expect(result).toBe(test.expectadValue);
    }
  });
});