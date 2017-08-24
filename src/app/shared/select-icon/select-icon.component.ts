import { Component, OnInit, Input, HostListener, HostBinding } from '@angular/core';
import { SelectIconService } from './select-icon.service';

@Component({
  selector: 'select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss']
})
export class SelectIconComponent implements OnInit {

  @Input() item: string;
  @Input() activeClassName: string = 'active';
  isActive = false;
  constructor(
    public selectIconService: SelectIconService
  ) { }

  ngOnInit() {
    this.selectIconService.clearRequest$.subscribe(r => this.item !== r ? this.isActive = false : this.isActive = true);
  }

  @HostBinding('class') get setActive() {
    return this.isActive ? this.activeClassName : '';
  }

  @HostListener('click')
  onClick() { this.isActive = !this.isActive }


}
