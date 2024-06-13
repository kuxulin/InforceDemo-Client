import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddUrlDialogComponent } from '../add-url-dialog/add-url-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-urls-table',
  templateUrl: './urls-table.component.html',
  styleUrls: ['./urls-table.component.scss'],
})
export class UrlsTableComponent implements OnInit {
  displayedColumns: string[] = ['longUrl', 'shortUrl', 'deleteColumn'];

  user$ = this.authService.user.asObservable();
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
    this.dialog.open(AddUrlDialogComponent, dialogConfig);
  }
}
