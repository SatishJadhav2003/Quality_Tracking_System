import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { AddUserComponent } from "../add-user/add-user.component";
import { FormsModule } from '@angular/forms';
import { MnDropdownComponent } from '../../Component/dropdown';
import { FlatpickrModule } from '../../Component/flatpickr/flatpickr.module';
import { MDModalModule } from '../../Component/modals';
import { NGXPagination } from '../../Component/pagination';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { SearchPipe } from '../../shared/search.pipe';
import { fetchUserListData } from '../../store/User/user-action';
import { selectUserLoading, selectUserList } from '../../store/User/user-selector';

@Component({
  selector: 'app-users-grid',
  standalone: true,
  imports: [PageTitleComponent, LucideAngularModule, NGXPagination, RouterModule, FlatpickrModule, MnDropdownComponent, MDModalModule, RouterLink, AddUserComponent,FormsModule],
  templateUrl: './users-grid.component.html',
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }],
  styles: ``
})
export class UsersGridComponent {
  griddata: any;

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems: number = 0;
  startIndex: number = 0;
  endIndex: any;
  allgriddata: any
  searchUser:string = '';
  private store = inject(Store)

  ngOnInit(): void {

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchUserListData());
      this.store.select(selectUserLoading).subscribe(data => {
        if (data == false) {
          document.getElementById('elmLoader')?.classList.add('d-none')
        }
      })
      this.store.select(selectUserList).subscribe(data => {
        this.griddata = data
        this.allgriddata = data
        this.totalItems = this.griddata.length;
      });

    }, 500)
  }


  // Search functionality
  onSearchChange() {
    const searchPipe = new SearchPipe();
    this.griddata = searchPipe.transform(this.allgriddata, this.searchUser);
  }

  // Pagination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePagedOrders();
  }

  getEndIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems)
  }

  updatePagedOrders(): void {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.griddata = this.allgriddata.slice(this.startIndex, this.endIndex);
  }
}
