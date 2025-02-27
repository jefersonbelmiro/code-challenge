import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  private service = inject(UsersService);
  private destroyed = new Subject<void>();
  protected users: User[] = [];

  ngOnInit(): void {
    this.service
      .getAll()
      .pipe(takeUntil(this.destroyed))
      .subscribe((response) => {
        this.users = response;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
