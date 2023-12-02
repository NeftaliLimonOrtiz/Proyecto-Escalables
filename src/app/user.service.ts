// user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  setAdminStatus(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }

  isAdminValue(): boolean {
    return this.isAdminSubject.value;
  }
}
