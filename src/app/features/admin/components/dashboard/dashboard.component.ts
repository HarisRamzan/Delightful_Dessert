import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any = {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  };
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.apiService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        // Use mock data for demonstration
        this.stats = {
          totalRevenue: 45280.50,
          totalOrders: 324,
          totalProducts: 48,
          totalUsers: 892,
          pendingOrders: 12,
          lowStockProducts: 5
        };
        this.loading = false;
      }
    });
  }
}
