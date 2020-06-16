import cities from 'cities.json';
import alternatives from 'alternatives.json';

for (let city of cities) {
  test(`All fields are present for ${city.name}`, () => {
    expect(city).toHaveProperty('name');
    expect(city).toHaveProperty('state');
    expect(city).toHaveProperty('generalFund');
    expect(city).toHaveProperty('policeBudget');
    expect(city).toHaveProperty('links');
    expect(city).toHaveProperty('notes');
    expect(city).toHaveProperty('departments');
  });

  for (let department of city.departments) {
    expect(department).toHaveProperty('name');
    expect(department).toHaveProperty('budget');
  }
}

for (let alternative of alternatives) {
  test(`All fields are present for "${alternative.name}"`, () => {
    expect(alternative).toHaveProperty('name');
    expect(alternative).toHaveProperty('salary');
    expect(alternative).toHaveProperty('nationalUnitCost');
    expect(alternative).toHaveProperty('cityData');

    if (!alternative.salary) {
      expect(alternative).toHaveProperty('links');
      expect(alternative).toHaveProperty('notes');
    }

    for (let city of alternative.cityData) {
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('dept');
      expect(city).toHaveProperty('unitCost');
    }
  })

  test(`City data exists for "${alternative.name}"`, () => {
    for (let city of alternative.cityData) {
      // For each city listed, we can find a match in cities.json
      const matchingCity = cities.filter(c => c.name === city.name)[0];
      let comparisonCityString = `No city named ${city.name} found.`
      if (matchingCity) {
        comparisonCityString = matchingCity.name;
      }
      expect(comparisonCityString).toEqual(city.name);
      // For each department listed, we can find a match for that city
      const matchingDepts = matchingCity.departments.filter(d => d.name === city.dept);
      let comparisonDeptString = `${matchingCity.name} has no ${city.dept} Department.`
      if (matchingDepts[0]) {
        comparisonDeptString = matchingDepts[0].name;
      }
      expect(comparisonDeptString).toEqual(city.dept);
    }
  })
}

// Check this alternative has an entry for EACH city
test(`Each alternative has a data entry for each city`, () => {
  for (let city of cities) {
    for (let alternative of alternatives) {
      const matches = alternative.cityData.filter(c => c.name === city.name);
      let comparisonCityString = `${alternative.name} has no entry for ${city.name}.`
      if (matches[0]) {
        comparisonCityString = matches[0].name;
      }
      expect(comparisonCityString).toEqual(city.name);
    }
  }
})

// Check that if nationalCost is null, then each city cost is Not null.
// if nationalCost is present, then each city cost SHOULD be null.
test(`Each alternative has either a national cost or city costs`, () => {
  for (let alternative of alternatives) {
    if (alternative.nationalUnitCost) {
      alternative.cityData.forEach(city => {
        expect(city.unitCost).toEqual(null);
      })
    }
    else {
      alternative.cityData.forEach(city => {
        expect(city.unitCost).not.toBeNull();
      })
    }
  }
})