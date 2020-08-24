import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("accounts")
export class Account {
  
  @PrimaryGeneratedColumn({name: 'id'})
  public id: number;
  
  @Column({name: 'full_name'})
  public fullName: string;

  @Column({name: 'register_cpf'})
  public registerCpf: string;

  @Column({ name: 'balance', type: "double", precision: 10, scale: 2, default: 0.00 }) 
  public balance: number;
}

export default Account;