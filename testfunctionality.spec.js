const { converter } = require('./index')
describe('functionalitys being tested', () => {
  const testcases = [
    {
      scenario: "converter test 1 'integer with an integer'",
      input: [400, 3],
      outcome: 1 && 12,
    },
    {
      scenario: "converter test 2 'number as a string with an integer'",
      input: ["400", 3],
      outcome: 1 && 12,
    },
    
  ];
  const negativetestcases = [
    {
      scenario: "converter test n1 'integer with a boolean'",
      input: [10, false],
      outcome: "Invalid data type",
    },
    {
      scenario: "converter test n2 'inputting a integer and a string'",
      input: [3, "hello"],
      outcome: "Invalid data type",
    },
    {
      scenario:
        "converter test n3 'inputting car_risks that are not between 1 to 5'",
      input: [400, 6],
      outcome: "Risk rating must be between 1 to 5",
    },
    {
      scenario:
        "converter test n4 'inputting car_risks that are not between 1 to 5'",
      input: [400, 0],
      outcome: "Risk rating must be between 1 to 5",
    }
  ];
  negativetestcases.map(elem => {
    it(elem.scenario, () => {
      expect(() => {
        converter(elem.input[0], elem.input[1])
      }).toThrow(elem.outcome);
    })
  })

  testcases.map((elem) => {
    it(elem.scenario, () => {
      const array = [{ monthly_premium: 50, yearly_premium: 330 }];
      array.push(converter(elem.input[0], elem.input[1]));
      const comparison = array[1].monthly_premium && array[1].yearly_premium;
      expect(comparison).toBe(elem.outcome);

    })
  });
})