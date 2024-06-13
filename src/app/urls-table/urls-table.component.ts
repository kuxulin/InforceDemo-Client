import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import User from '../models/User';
import { AuthService } from '../services/auth.service';
import Url from '../models/url';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ROLES } from 'src/consts';
import { AddUrlDialogComponent } from '../add-url-dialog/add-url-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UrlService } from '../services/url.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-urls-table',
  templateUrl: './urls-table.component.html',
  styleUrls: ['./urls-table.component.scss'],
})
export class UrlsTableComponent implements OnInit {
  displayedColumns: string[] = ['longUrl', 'shortUrl', 'deleteColumn'];

  user$ = this.authService.user$.asObservable();
  urls$ = this.urlService.urls$;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.closeOnNavigation = true;
    dialogConfig.width = '40%';

    let dialog = this.dialog.open(AddUrlDialogComponent, dialogConfig);

    dialog.afterClosed();
  }
}
