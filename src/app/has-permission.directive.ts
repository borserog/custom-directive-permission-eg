import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  readonly onDestroy$ = new Subject();
  localRole: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.role$
      .pipe(
        takeUntil(this.onDestroy$),
        finalize(() => 'directive unsubscribed')
      )
      .subscribe(role => {
        if (role === 'ADMIN' && role !== this.localRole) {
          this.localRole = role;
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (role !== 'ADMIN') {
          console.log(role, this.localRole);
          this.localRole = role;
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
