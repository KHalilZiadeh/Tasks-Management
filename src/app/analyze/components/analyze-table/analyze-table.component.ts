import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../shared/interfaces/itask';
import { IUsers } from '../../../shared/interfaces/iusers';
import { TasksService } from '../../../shared/services/tasks.service';
import { UsersService } from '../../../shared/services/users-service.service';

interface IUserData {
  username:string,
  totalTasks:number,
  done:number,
  yet:number,
  percent:string
}

@Component({
  selector: 'app-analyze-table',
  templateUrl: './analyze-table.component.html',
  styleUrls: ['./analyze-table.component.scss']
})
export class AnalyzeTableComponent implements OnInit {

  filteredTasks!:ITask[]
  allUsers!:IUsers[]
  usersData:IUserData[] = []
  selected!:number

  @Input() id!:number

  constructor(private tasks:TasksService, private users:UsersService) { }

  ngOnInit(): void {
    this.tasks.getAllTasks().subscribe(tasks => {
      this.filteredTasks = tasks
      this.users.getAllUsers().subscribe(users => {
        this.allUsers = users
        this.allUsers.forEach(user => {
          let newEntry:IUserData ={
            username: user.username,
            totalTasks: 0,
            done: 0, 
            yet: 0,
            percent: "0"
          }
          this.filteredTasks.forEach(task => {
            if(task.to === user.username){
              newEntry.totalTasks++
              task.status === 'done' ? newEntry.done++ : newEntry.yet++
            }
          })
          newEntry.percent = `${(newEntry.done/newEntry.totalTasks)* 100}%`
          this.usersData.push(newEntry)
        })
      })
    })

  }

  select(event:any):void{
    event.stopPropagation()
    if(this.selected != event.target.id.split("-")[1]){
      this.selected = event.target.id.split("-")[1]
    }else{
      this.selected = -1
    }
  }
}
