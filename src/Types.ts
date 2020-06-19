// -------------------------------------------------------- //
//                          City Types                      //
// -------------------------------------------------------- //

export interface DataLink {
  url: string,
  linkText: string
}

interface Department {
  name: string,
  budget: number
}

export interface City {
  name: string,
  state: string,
  generalFund: number,
  policeBudget: number,
  links: DataLink[],
  notes: string[],
  departments: Department[]
}

// -------------------------------------------------------- //
//                      Alternative Types                   //
// -------------------------------------------------------- //
export interface CityData {
  name: string,
  dept: string,
  unitCost: number | null
}


export interface Alternative {
  name: string,
  salary: boolean,
  nationalUnitCost: number | null,
  cityData: CityData[],
  notes?: string[],
  links?: DataLink[]
}

// -------------------------------------------------------- //
//                    Alternative Helpers                   //
// -------------------------------------------------------- //

export const getUnitCost = (alt: Alternative, cityName: string): number => {
  const cityData = alt.cityData.filter(c => c.name === cityName)[0];
  if (alt.nationalUnitCost) {
    return alt.nationalUnitCost;
  }
  else if (cityData.unitCost) {
    return cityData.unitCost;
  }
  else {
    throw new Error(`No city or national unit cost found for ${alt}.`);
  }
}

export const getDeptBudget = (alt: Alternative, cityName: string, cities: City[]): number => {
  const city = cities.filter(c => c.name === cityName)[0];
  const cityData = alt.cityData.filter(c => c.name === cityName)[0];
  const department = city.departments.filter(d => d.name === cityData.dept)[0];
  return department.budget;
}

export const getDeptName = (alt: Alternative, cityName: string): string => {
  const cityData = alt.cityData.filter(c => c.name === cityName)[0];
  return cityData.dept;
}