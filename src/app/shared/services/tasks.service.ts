import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/itask';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) { }

  private filteredUsersSubject = new BehaviorSubject<string[]>(['all']);
  filteredUsers$: Observable<string[]> =
    this.filteredUsersSubject.asObservable();
  private allTasksSubject = new Subject<ITask[]>();
  allTasks$: Observable<ITask[]> = this.allTasksSubject.asObservable();

  addTask(
    title: string,
    taskTxt: string,
    from: string,
    to: string,
    deadline: string,
    priority: number
  ): void {
    let task!: ITask;
    this.getlastTaskId().subscribe((lastId) => {
      task = {
        id: lastId,
        taskTxt: taskTxt,
        from: from,
        to: to,
        status: 'yet',
        title: title,
        deadline: deadline,
        priority: priority
      };
      this.http.post(environment.tasksBaseLink, task).subscribe();
    });
  }

  ediTask(task: ITask): void {
    this.http
      .put<ITask>(environment.tasksBaseLink + '/' + task.id, task)
      .subscribe();
  }

  getlastTaskId(): Observable<string> {
    return new Observable<string>((ObLastId) => {
      this.getAllTasks().subscribe((tasks) => {
        let id: number = -1;
        for (let task of tasks) {
          if (Number(task.id) > id) {
            id = Number(task.id);
          }
        }
        ObLastId.next(`${id + 1}`);
        ObLastId.complete();
      });
    });
  }

  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(environment.tasksBaseLink);
  }

  getTasksByUser(name: string) {
    return this.http.get<ITask[]>(environment.tasksBaseLink + `?from=` + name);
  }

  updateFilteredUsers(newValues: string[]): void {
    this.filteredUsersSubject.next(newValues);
  }

  upadteTasks(originalArray: ITask[], id?: string): void {
    this.allTasksSubject.next;
  }

  getTaskById(taskId: string): Observable<ITask> {
    return this.http.get<ITask>(environment.tasksBaseLink + '/' + taskId);
  }

  deleteTask(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(environment.tasksBaseLink + '/' + taskId);
  }
}
