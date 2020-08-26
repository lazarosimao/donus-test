import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("transactions")
export class Transaction {
  
  @PrimaryGeneratedColumn({name: 'id'})
  public id: number;
  
  @Column({ name: 'type'})
  public type: string;

  @Column({name: 'account_id'})
  public accountId: number;

  @Column({name: 'to_account_id'})
  public toAccountId: number;

  @Column({ name: 'amount_request', type: "double", precision: 10, scale: 2, default: 0.00 }) 
  public amountRequest: number;

  @Column({ name: 'rate_amount', type: "double", precision: 10, scale: 2, default: 0.00 }) 
  public rateAmount: number;

  @Column({ name: 'bonus_amount', type: "double", precision: 10, scale: 2, default: 0.00 }) 
  public bonusAmount: number;

  @Column({ name: 'total', type: "double", precision: 10, scale: 2, default: 0.00 }) 
  public total: number;
}

export class TransactionType {
  static DEPOSIT: string = 'deposit';
  static WITHDRAW: string = 'withdraw';
  static TRANSFER: string = 'transfer';
}