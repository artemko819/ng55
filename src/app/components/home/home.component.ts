import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,query,animate,keyframes,stagger} from '@angular/animations';
import {DataService} from '../../services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('goals',[
      transition('*=>*',[
        query(':enter',style({opacity:0}),{optional: true}),
        
        query(':enter', stagger('300ms',[
          animate('0.6s ease-in',keyframes([
            style({opacity:0, transform:'translateY(-75%)',offset:0}),
            style({opacity:0.5, transform:'translateY(30px)',offset:0.3}),
            style({opacity:1, transform:'translateY(0%)',offset:1}),
          ]))]),{optional: true}),
        
        query(':leave ', stagger('300ms',[
          animate('0.6s ease-in',keyframes([
            style({opacity:1, transform:'translateY(0%)',offset:0}),
            style({opacity:0.5, transform:'translateY(30px)',offset:0.3}),
            style({opacity:0, transform:'translateY(-75%)',offset:1}),
          ]))]),{optional: true}),


      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  itemCount:number;
  btnTxt:string = 'Add Item';
  goalText:string = 'My first goal';
  goals=[];
  
  constructor(private _data:DataService) {}

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  addItem(){
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }
  removeItem(i){
    this.goals.splice(i, 1);    
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
