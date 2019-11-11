import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class TriggerService {
  constructor(private modalService: NgbModal, config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  triggerLoading() {
    this.modalService.open(LoadingComponent, {
      centered: true,
      windowClass: 'loadingModal',
      backdropClass: 'dark-backdrop',
    });
  }
}
