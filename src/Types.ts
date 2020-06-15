export interface City {
  name: string,
  state: string,
  generalFund: number,
  policeBudget: number
  alternatives: Alternative[]
}

export interface Alternative {
  name: string,
  cost: number,
  dept: string,
  deptBudget: number
}