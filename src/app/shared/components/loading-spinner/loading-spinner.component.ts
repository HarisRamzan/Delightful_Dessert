import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-spinner">
      <mat-spinner [diameter]="diameter"></mat-spinner>
      <p *ngIf="message">{{message}}</p>
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      gap: 16px;

      p {
        color: #666;
        margin: 0;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() diameter: number = 50;
  @Input() message?: string;
}
