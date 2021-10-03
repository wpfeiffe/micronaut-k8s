export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
  startDate: string;
  title: string;
  department: Department;
}

export interface Department {
  id: number;
  deptName: string;
  deptCode: string;
  company: Company;
}

export interface Company {
  id: number;
  companyName: string;
}
