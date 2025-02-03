interface Address {
    line2: string;
    line1: string;
    city: string;
    state: string;
  }
  
  interface Name {
    lastName: string;
    firstName: string;
  }
  
  export interface Person {
    name: Name;
    age: number;
    address: Address;
    gender: string;
  }