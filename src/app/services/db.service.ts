import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Investment } from './investment';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  investmentList = new BehaviorSubject([]);
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
						)`
		      , [])
		      .then(() => console.log('Executed SQL'))
		      .catch(e => console.log(e));
		      this.isDbReady.next(true);
		      this.getinvestments();
	      })
	    });
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
      return res;
    });
  }
 
  // Get single object
  getSong(id): Promise<Investment> {
    return this.storage.executeSql('SELECT * FROM investment WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        investment_name: res.rows.item(0).investment_name,  
        investment_title: res.rows.item(0).investment_title,
        investment_amount: res.rows.item(0).investment_amount,
		    investment_type: res.rows.item(0).investment_type,
		    investment_app: res.rows.item(0).investment_app,
		    investment_started_on: res.rows.item(0).investment_started_on,
		    investment_maturing_on: res.rows.item(0).investment_maturing_on,
		    investment_interest_rate : res.rows.item(0).investment_interest_rate,
		    investment_more_info : res.rows.item(0).investment_more_info
      }
    });
  }

  // Update
  // updateSong(id, song: Song) {
  //   let data = [song.artist_name, song.song_name];
  //   return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
  //   .then(data => {
  //     this.getSongs();
  //   })
  // }

  // Delete
  deleteInvestment(id,investment_name)  {
  	this.investment_name=investment_name;
  	console.log("delete investment_name : ",this.investment_name);
    return this.storage.executeSql('DELETE FROM investment WHERE id = ?', [id])
    .then(res=> {
    	console.log("In delete Investment :",res);
      this.getinvestments();
    });
  }
}