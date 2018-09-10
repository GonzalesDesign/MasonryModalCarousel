



// import { MasonModalCarouselService } from './../../services/mason-modal-carousel.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpComponent } from './pop-up/pop-up.component';
import { MasonModalCarouselDataService } from './../../services/mason-modal-carousel-data.service';
import { FunksionsService } from './../../services/funksions.service';
import { CarouselService } from './../../services/carousel.service';

@Component({
  selector: 'app-mason-modal-carousel',
  templateUrl: './mason-modal-carousel.component.html',
  styleUrls: ['./mason-modal-carousel.component.scss']
})
export class MasonModalCarouselComponent implements OnInit, AfterViewInit {
  // public aImagePaths = [];
  public aImages = [];
  // public aImagesLength: number;
  // public aMainImages = [];
  public mainContainer = '#main-kontainer-id';
  /*-= Error var | prop =----*/
  public errorMsg = 'You got an error!';

  /*-= PopUp Modal Variables =---*/
  // public modalMaxWidth = '50vw';
  public screenWidth = window.innerWidth;
  public modalWidthVW = '90vw'; // Math.round((this.screenWidth * .90));
  public isEscapeToClose = true;
  public isClickOutsideToClose = true;

  /*-= Loader var | prop =----*/
  public loading = '.loading';
  public loadingKontainer = '.loading-kontainer';

  /*-= Timer =----*/
  public timeout = 1000;

  constructor(private _mmcDataService: MasonModalCarouselDataService,
              private _popUp: MatDialog,
              private _funksions: FunksionsService,
              private _carousel: CarouselService) { }

  ngOnInit() {
    /*---=|••• OBSERVABLE •••|=---*/
  this._mmcDataService.mmcData()
  .subscribe(data => {
    this.aImages = data; // populate aImages array with all the data
    this._funksions.fDisplay(this.loadingKontainer, 'flex'); // show loader
    this._funksions.fLoadTimer(this.loading, this.timeout); // simulating text percentage loading
    // console.log('this.aImages: ', this.aImages);
    },
    error => this.errorMsg = error); // ????????? Work on this error
    this._funksions.fDisplay(this.mainContainer, 'none');

    /* clientWidth test */
    // const cw = document.querySelector('.loading-kontainer');
    // console.log('cw: ', cw.clientWidth);
    // this._carousel.commonCounter = 0; // -(commonCounterLastIndex);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.fSliderInit();
      this._funksions.fRemoveLoader(this.loadingKontainer, 'none', .5); // remove loader
      this._funksions.fDisplay(this.mainContainer, 'block'); // display mainContainer
      // this._funksions.fTLMx(this.mainContainer, this.imageNameKontainer); // animate images and titles
    }, this.timeout);
  }

  fOpenModal(xId, pathImg, img, title, description): void {
    const dialogRef = this._popUp.open(PopUpComponent, {
      maxWidth: this.modalWidthVW,
        // this.modalWidthVW; // this._mmcDataService.modalMaxWidth + 'vw', // this.modalMaxWidth, // '90vw',
      height: this._mmcDataService.modalHeight + 'px',
      data: { imgPath: pathImg, imahe: img, xId: xId, titolo: title, deskription: description }
          // escapeToClose: this.isEscapeToClose,
          // clickOutsideToClose: this.isClickOutsideToClose,
    });
    // this.imageName = img;
    // console.log('xId: ', xId);
    // console.log('pathImg: ', pathImg);
    // console.log('img: ', img);
    // console.log('dialogRef: ', dialogRef);

    console.log('modalWidthVW: ', this.modalWidthVW);
    // console.log('maxWidth: ', PopUpComponent.maxWidth);
    console.log('******---= ', title, ' =---*****');
    // console.log('description: ', description);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed: ${result}`);
      // title = result;
      // this.dialogResult = result;
      // reset pop-up datas
    });

  }


}
