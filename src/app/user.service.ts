import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private readonly roleSubject = new BehaviorSubject('USER');
  readonly role$ = this.roleSubject.asObservable();

  constructor() { }

  changePermission(role: string) {
    this.roleSubject.next(role);
  }
}