import { Component, DestroyRef, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../services/url.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-url-dialog',
  templateUrl: './add-url-dialog.component.html',
  styleUrls: ['./add-url-dialog.component.scss'],
})
export class AddUrlDialogComponent {
  longUrlVersion: string | undefined;
  shortUrl: string | undefined;
  destroyRef = inject(DestroyRef);
  constructor(
    private urlService: UrlService,
    public dialogRef: MatDialogRef<AddUrlDialogComponent>
  ) {}

  isFormFull(): Boolean {
    return !!this.longUrlVersion;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    this.urlService
      .createUrl(this.longUrlVersion!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => (this.shortUrl = res.shortUrl),
        error: (result) => {
          alert(result.error.text);
        },
      });
  }
}
