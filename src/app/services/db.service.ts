import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Investment } from './investment';
import { InvestmentOverview } from './investment-overview';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  investmentList = new BehaviorSubject([]);
  investmentOverviewList = new BehaviorSubject([]);
  investment_name:string;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite
  ) {
	    this.platform.ready().then(() => {
	      this.sqlite.create({
	        name: 'investment_db.db',
	        location: 'default'
	      })
	      .then((db: SQLiteObject) => {
	          this.storage = db;
	          db.executeSql(`CREATE TABLE IF NOT EXISTS investment(
				    id INTEGER PRIMARY KEY AUTOINCREMENT,
				    investment_name TEXT, 
				    investment_title TEXT,
				    investment_amount INTEGER,
				    investment_type TEXT,
				    investment_app TEXT,
				    investment_started_on DATE,
				    investment_maturing_on DATE,
				    investment_interest_rate TEXT,
				    investment_more_info TEXT
						);
            `
		      , [])
		      .then(() => {
            db.executeSql(`CREATE TABLE IF NOT EXISTS investment_abs_return(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            investment_name TEXT, 
            investment_absolute_return TEXT
            );`
            ,[])
            .then(()=>{
              this.isDbReady.next(true);
              this.getinvestments();
            }).catch(e => console.log(e));
          }).catch(e => console.log(e));
	      }).catch(e => console.log(e));
	    }).catch(e => console.log(e));
  	}

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchInvestments(investment_name): Observable<Investment[]> {
  	console.log("In fetch Investment InvestmentName : ",investment_name);
  	this.investment_name=investment_name;
  	this.getinvestments();
    return this.investmentList.asObservable();
  }
  fetchInvestmentsDetails(): Observable<InvestmentOverview[]> {
  	console.log("In fetch Investment Details : ");
  	this.getInvestmentsDetails();
    return this.investmentOverviewList.asObservable();
  }


  // Get list
  getinvestments(){
  	var sqlQuery: string = "SELECT * FROM investment WHERE investment_name IN ('" + this.investment_name + "') ";
  	console.log("SQL Query : ",sqlQuery);
    return this.storage.executeSql(sqlQuery, []).then(res => {
    	console.log("In Get Investments : ",res);
      let items: Investment[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            investment_name: res.rows.item(i).investment_name,  
            investment_title: res.rows.item(i).investment_title,
            investment_amount: res.rows.item(i).investment_amount,
				    investment_type: res.rows.item(i).investment_type,
				    investment_app: res.rows.item(i).investment_app,
				    investment_started_on: res.rows.item(i).investment_started_on,
				    investment_maturing_on: res.rows.item(i).investment_maturing_on,
				    investment_interest_rate : res.rows.item(i).investment_interest_rate,
				    investment_more_info : res.rows.item(i).investment_more_info
           });
        }
      }
      console.log("Call to next");
      this.investmentList.next(items);
    }).catch(e => console.log(e));
  }
  getInvestmentsDetails(){
  	var sqlQuery: string = `SELECT SUM(investment_amount) as sum, COUNT(*) as num, i.investment_name, iar.investment_absolute_return
  	FROM investment as i left join investment_abs_return as iar  where i.investment_name = iar.investment_name GROUP BY i.investment_name`;
  	console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
    	console.log("In Get Investments Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_name,  
            investment_amount: res.rows.item(i).sum,
				    investment_num: res.rows.item(i).num,
            investment_abs_return : res.rows.item(i).investment_absolute_return
				 });
        }
      }
      this.investmentOverviewList.next(items);
    }).catch(e => console.log(e));
  }
  getTaxPF(year){
    var sqlQuery: string = `SELECT count(*) as num,sum(investment_amount) as sum,investment_name
    FROM investment  WHERE investment_started_on >= '20`+[year-1]+`-04-01'
    AND investment_started_on <= '20`+year+`-03-31' AND investment_name='ProvidentFund';`;
    console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Tax Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_name,  
            investment_amount: res.rows.item(i).sum,
            investment_num: res.rows.item(i).num,
            investment_abs_return : 0
         });
        }

      }
      return items;
    }).catch(e => console.log(e));
  }
  getTaxElss(year){
    var sqlQuery: string = `SELECT count(*) as num,sum(investment_amount) as sum,investment_type
    FROM investment  WHERE investment_started_on >= '20`+[year-1]+`-04-01'
    AND investment_started_on <= '20`+year+`-03-31' AND investment_type='elss';`;
    console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Tax Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_type,  
            investment_amount: res.rows.item(i).sum,
            investment_num: res.rows.item(i).num,
            investment_abs_return : 0
         });
        }

      }
      return items;
    }).catch(e => console.log(e));
  }
  getTaxSSY(year){
    var sqlQuery: string = `SELECT count(*) as num,sum(investment_amount) as sum,investment_type
    FROM investment  WHERE investment_started_on >= '20`+[year-1]+`-04-01'
    AND investment_started_on <= '20`+year+`-03-31' AND investment_type='ssy';`;
    console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Tax Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_type,  
            investment_amount: res.rows.item(i).sum,
            investment_num: res.rows.item(i).num,
            investment_abs_return : 0
         });
        }

      }
      return items;
    }).catch(e => console.log(e));
  }

  getTaxInsurance(year){
    var sqlQuery: string = `SELECT count(*) as num,sum(investment_amount) as sum,investment_type
    FROM investment  WHERE investment_started_on >= '20`+[year-1]+`-04-01'
    AND investment_started_on <= '20`+year+`-03-31' AND investment_name='lic'
    OR investment_type='8CtaxSavingInsurance';`;
    console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Tax Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_type,  
            investment_amount: res.rows.item(i).sum,
            investment_num: res.rows.item(i).num,
            investment_abs_return : 0
         });
        }

      }
      return items;
    }).catch(e => console.log(e));
  }

  getTaxFD(year){
    var sqlQuery: string = `SELECT count(*) as num,sum(investment_amount) as sum,investment_type
    FROM investment  WHERE investment_started_on >= '20`+[year-1]+`-04-01'
    AND investment_started_on <= '20`+year+`-03-31' AND investment_type='taxsavingfd';`;
    console.log("SQL Query : ",sqlQuery)
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Tax Details : ",res);
      let items: InvestmentOverview[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            investment_name: res.rows.item(i).investment_type,  
            investment_amount: res.rows.item(i).sum,
            investment_num: res.rows.item(i).num,
            investment_abs_return : 0
         });
        }

      }
      return items;
    }).catch(e => console.log(e));
  }


  // Add
  addInvestment(investment_name, investment_title,investment_amount,investment_type,investment_app,
  	investment_started_on,investment_maturing_on,investment_interest_rate,investment_more_info){
  	this.investment_name=investment_name;
    let data = [investment_name, investment_title,investment_amount,investment_type,investment_app,
  	investment_started_on,investment_maturing_on,investment_interest_rate,investment_more_info];
    return this.storage.executeSql(`INSERT INTO investment (investment_name, investment_title,investment_amount,
    	investment_type,investment_app,investment_started_on,investment_maturing_on,
    	investment_interest_rate,investment_more_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, data)
    .then(res => {
    	console.log("In Add Investment : ",res);
    	this.getinvestments();
    	this.getInvestmentsDetails();
      return res;
    }).catch(e => console.log(e));
  }

  // Delete
  deleteInvestment(id,investment_name)  {
  	this.investment_name=investment_name;
  	console.log("delete investment_name : ",this.investment_name);
    return this.storage.executeSql('DELETE FROM investment WHERE id = ?', [id])
    .then(res=> {
    	console.log("In delete Investment :",res);
      this.getinvestments();
      this.getInvestmentsDetails();
    }).catch(e => console.log(e));
  }

  addAbsReturns(Insv,InsvValue){
   return this.storage.executeSql(`INSERT INTO investment_abs_return (investment_name, investment_absolute_return) VALUES (?, ?)`, [Insv,InsvValue])
    .then(res => {
      console.log("In Add Abs Returns : ",res);
      this.getInvestmentsDetails();

    }).catch(e => console.log(e));
  }
  updateAbsReturns(Insv,InsvValue){
   return this.storage.executeSql(`UPDATE investment_abs_return SET investment_absolute_return = 7`,[])
    .then(res => {
      console.log("In Update Abs Returns : ",res);
      this.getInvestmentsDetails();
      return res
    }).catch(e => console.log(e));
  }
  getAbsReturns(){
    var sqlQuery: string = "SELECT * FROM investment_abs_return ";
    console.log("SQL Query : ",sqlQuery);
    return this.storage.executeSql(sqlQuery, []).then(res => {
      console.log("In Get Abs Returns : ",res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          console.log(res.rows.item(i));
       
        }
        return res;

      }
    })
  }
}