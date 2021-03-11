import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivityService } from '../activity.service';
import { ActivityItem } from '../activityItem'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatInput } from '@angular/material/input';


@Component({
  selector: 'app-activity-items',
  templateUrl: './activity-items.component.html',
  styleUrls: ['./activity-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActivityItemsComponent implements OnInit {
  displayedColumns: string[] = ['key', 'activity', 'type', 'participants', 'price', 'link', 'accessibility'];
  dataSource: MatTableDataSource<ActivityItem>;
  activityItems: ActivityItem[] = [];

  activityItem: ActivityItem = this.getEmptyActivityItem();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatInput) filterInput: MatInput;

  constructor(private activityService: ActivityService, private changeDerectorRefs: ChangeDetectorRef) { 
    this.dataSource = new MatTableDataSource(this.activityItems)    
  }

  ngOnInit(): void {
    this.getAPIActivityItems();    
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  getEmptyActivityItem(): ActivityItem {
    return {
      key: undefined,
      activity: undefined,
      type: undefined,
      participants: undefined,
      price: undefined,
      link: undefined,
      accessibility: undefined
    }
  }

  getActivity(): void {    
    this.activityService.getActivityItem()
      .subscribe(activityItem => {
        this.activityItem = activityItem;      
        this.dataSource.data.push(this.activityItem);        
        console.log(this.activityItems);     
        this.table.renderRows();
        this.postAPIActivityItem(activityItem); 
      });          
  }

  getAPIActivityItems(): void {
    this.activityService.getAPIActivityItems()
      .subscribe(activityItems => {
        this.dataSource.data = activityItems;
        this.changeDerectorRefs.detectChanges();    
        console.log(this.dataSource.data); 
      });   
  }

  postAPIActivityItem(activityItem: ActivityItem): void {
    this.activityService.postAPIActivityItem(activityItem)
      .subscribe( activityItem => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteDisplayedActivites(): Observable<ActivityItem[]> {    
    const activityItemKeysAsString: number[] = this.dataSource.filteredData.map(k => k.key);    
    return this.activityService.deleteAPIActivityItems(activityItemKeysAsString);        
  }

  deleteDisplayedActivitiesAndRefresh(): void {
    this.deleteDisplayedActivites().subscribe(activityItem => {
      this.dataSource.filter = "";
      this.filterInput.value = "";
      this.activityItem = this.getEmptyActivityItem();
      this.getAPIActivityItems();
      this.table.dataSource = this.dataSource;
      this.table.renderRows();
    });
  }
}
