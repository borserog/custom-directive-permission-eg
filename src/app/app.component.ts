import { ChangeDetectionStrategy } from '@angular/core';
import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  userRole$: Observable<string>;
  students = [
    {
      name: 'Gabriel',
      course: 'Computer Science'
    },
    {
      name: 'Eduardo',
      course: 'Design'
    },
    {
      name: 'Lucas',
      course: 'Electrical Engineering'
    }
  ];
  messages = Array.from({ length: this.students.length }, () => '');

  constructor(
    private userService: UserService
  ) {
    this.userRole$ = this.userService.role$;
  }

  onView(index: number) {
    this.messages[index] = 'Any user can view info';
  }

  onEdit(index: number) {
    this.messages[index] = 'Admins can edit';
  }

  resetMessage(index: number) {
    this.messages[index] = '';
  }

  changeRole(role: string) {
    this.messages = this.messages.map(() => '');
    this.userService.changePermission(role);
  }
}
