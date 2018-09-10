
import { Component, OnInit, AfterViewInit, AfterViewChecked, Inject, ViewChild, ElementRef, ViewChildren, HostListener, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunksionsService } from './../../../services/funksions.service';
import { CarouselService } from './../../../services/carousel.service';
import { MasonModalCarouselDataService } from './../../../services/mason-modal-carousel-data.service';
import { Elastic } from "gsap";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})


export class PopUpComponent implements OnInit, AfterViewInit, AfterViewChecked {

  // @ViewChild('modalKontainerChild') modalChildKontainer: ElementRef; // too cumbersome
  // @ViewChild('carouselKontainerChild') carouselChildKontainer: ElementRef; // too cumbersome

  // @Input() modalMaxWidth: any; // not working with pop-up


  /*---= PopUp params properties =---*/
  public popImagePath = this.xData.imgPath;
  public imageToLoad = this.xData.imahe;
  public titolo = this.xData.titolo;
  public popDescription = this.xData.deskription;

  /*---= Modal properties =---*/
  public screenWidth: number = window.innerWidth;
  // public modalKontainerId = '#modal-kontainer-id'; //
  // public modalKontainerId = document.getElementById('modalKontainerId');
  public modalKontainerWidth: any;
  // public modalMaxWidth: any; //  = this._mmcDataService.modalMaxWidth; // width info from service
  public modalMaxHeight = this._mmcDataService.modalHeight; // height info from service

  /*---= Carousel properties =---*/
  public carouselMaskWidth: any;
  // public carouselKontainerId = '#carousel-kontainer-id'; // ul: photos strip
  // public carouselKontainer = '.carousel-kontainer';
  public carouselFotoStripWidth: any;
  // public totalImgsWidth: number;
  public photoStripSetCount: number; // foto strip width / imgs to display = set
  public commonCounterLastIndex: number;

  /*---= Images properties =---*/
  public imageKontainer = '.image-kontainer';
  public matDialogKontainer = '.mat-dialog-container'; // material modal
  public matDialogKontainerClass = document.getElementsByClassName('mat-dialog-container'); // material modal
  public fotoWidth?: any;
  public fotoHeight = 70;
  public marginsx = 100;
  public imgsToDisplay: number;
  public photosLength: number;
  /*---= Carousel buttons properties =---*/
  public arrowButtonsKontainer = ('.arrow-buttons-kontainer');
  public arrowButtonsKontainerYPos: any;
  public leftArrowButtonsKontainer = ('.left-button-kontainer');
  public rightArrowButtonsKontainer = ('.right-button-kontainer');
  public rightArrowButtonsKontainerXPos: any;
  public btnKontainerWidth = 200;

  public testWidth: any;


  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public xData: any,
    private _funksions: FunksionsService,
    private _carousel: CarouselService,
    private _mmcDataService: MasonModalCarouselDataService ) { }

  ngOnInit() {
    console.log('|-----= ngOnInit() =-----|');
    this._carousel.commonCounter = 0;
    console.log('this._carousel.commonCounter: ', this._carousel.commonCounter);
    // this.photosLength = this.imageToLoad.length;
    /* setTimeout(() => {
      this.testWidth = this.carouselChildKontainer.nativeElement.clientWidth;
      console.log('testWidth: ', this.testWidth);

      console.log('carouselChildKontainer: ', this.carouselChildKontainer.nativeElement.clientWidth);
      // this.fCarouselInit();
      // this.fResizeMe();
    }, 50); */
    // const modalMaxWidth = this._mmcDataService.modalMaxWidth; // width info from service
    /* this.modalKontainerWidth = this.modalMaxWidth;
    this.carouselMaskWidth = (this.modalMaxWidth * .8);
    console.log('modalKontainerWidth: ', this.modalKontainerWidth);
    console.log('carouselMaskWidth: ', this.carouselMaskWidth); */

    /* clientWidth test */
    // const cw = document.querySelector('.image-kontainer');
    // console.log('cw: ', cw.clientWidth);

    // this.fCarouselInit();
    this.fResizeMe();
  }

  ngAfterViewInit() {
    // console.log('|-----= ngAfterViewInit() =-----|');
    /* setTimeout(() => {
      this.carouselMaskWidth = this.carouselChildKontainer.nativeElement.clientWidth;
      console.log('carouselMaskWidth: ', this.carouselMaskWidth);
      this.fCarouselInit();
      this.fResizeMe();
    }, 50); */
  }

  ngAfterViewChecked() {
    /* this life cycle hook also resized pop up and its content */
    // // console.log(''|-----= ngAfterViewChecked() =-----|');
    // this.fCarouselInit();
    // this.fCarouselInit();
    // this.fResizeMe();
  }



  public fCarouselInit() {
    console.log('|-----= fCarouselInit() =-----|');
    this.photosLength = this.imageToLoad.length;
    const btnKontainerPadding = 72; // 24;

    // console.log('|-----= Modal Width =-----|');
      this.modalKontainerWidth = Math.round(this.screenWidth * .90);
      // this.modalKontainerWidth = this._mmcDataService.modalMaxWidth; // this.screenWidth * .80; // this.modalMaxWidth;
      // console.log('modalKontainerWidth: ', this.modalKontainerWidth);

    // console.log('|-----= Carousel Mask Width =-----|');
      this.carouselMaskWidth = Math.round((this.modalKontainerWidth * .90));
      // console.log('carouselMaskWidth: ', this.carouselMaskWidth);

    // console.log('|-----= Foto Width =-----|');
      this.fotoWidth = Math.round((this.carouselMaskWidth / this.imgsToDisplay)); // - 17 ;
      // console.log('fotoWidth: ', this.fotoWidth);

    // console.log('|-----= Carousel Strip Width =-----|');
      this.carouselFotoStripWidth = this.fotoWidth * this.photosLength;
      console.log('carouselFotoStripWidth: ', this.carouselFotoStripWidth);

      /*--- Resetting photo strip x position ---*/
      // this.totalImgsWidth = this.carouselFotoStripWidth; // total width of all images side by side
      this.photoStripSetCount = (this.carouselFotoStripWidth / this.modalKontainerWidth);
      this.commonCounterLastIndex = Math.round(this.photoStripSetCount - 1);
      // console.log('totalImgsWidth: ', this.totalImgsWidth);
      console.log('photoStripSetCount: ', this.photoStripSetCount);
      console.log('commonCounterLastIndex: ', this.commonCounterLastIndex);

    // console.log('|-----= Arrow Positions =-----|');
      this.rightArrowButtonsKontainerXPos = this.carouselMaskWidth - this.btnKontainerWidth; // - btnKontainerPadding;
      this.arrowButtonsKontainerYPos = this.modalMaxHeight / 2;

      // this._mmcDataService.fModalWidth(this.matDialogKontainer); // set .mat-dialog-container width
      // this._mmcDataService.fCarouselWidth(this.carouselKontainer);

      /* when resizing window, images shouldn't be cut off
       use commonCounter to dictate the last xposition to be used as a pin point */
      this._carousel.fSlideCarousel(this.imageKontainer,    // elem
            'none',                      // slideDirection
            this.fotoWidth,              // imgWidth
            this.imgsToDisplay,          // imgsToDisplay
            this.carouselFotoStripWidth  // imgKontainerWidth
      );
  }




  /*-- method call from view when pressing the right button --*/
  fSlideLeft() {
    this._carousel.fSlideCarousel(
            this.imageKontainer,
            'left',
            this.fotoWidth,
            this.imgsToDisplay,
            this.carouselFotoStripWidth);
  }

  /*-- method call from view when pressing the left button --*/
  fSlideRight() {
    this._carousel.fSlideCarousel(
            this.imageKontainer,
            'right',
            this.fotoWidth,
            this.imgsToDisplay,
            this.carouselFotoStripWidth);
  }

  /* fSlideLeft() {
    this._carousel.fSlideCarousel(
    this.imageKontainer,
    this.fotoWidth,
    this.imgsToDisplay);
  } */

  /*-- called inside fCarouselInit --*/
  fElementWidth(e, w) {
    const x = document.querySelector(e), s = x.style;
    s.width = w;
  }
  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.fResizeMe();
  }

  public fResizeMe() {
    console.log('|-----= fResizeMe() =-----|');
    this.screenWidth = window.innerWidth;

    // this.fCarouselInit();

    // /*--- Resetting photo strip x position ---*/
    // const totalImgsWidth = this.carouselFotoStripWidth; // total width of all images side by side
    // const photoStripSetCount = (totalImgsWidth / this.modalKontainerWidth);
    // const commonCounterLastIndex = Math.round(photoStripSetCount - 1);
    // console.log('totalImgsWidth: ', totalImgsWidth);
    // console.log('photoStripSetCount: ', photoStripSetCount);
    // console.log('commonCounterLastIndex: ', commonCounterLastIndex);

    /*--- Reset last commonCounter index ---*/
    if (this._carousel.endOfStrip) {
      this._carousel.commonCounter = -(this.commonCounterLastIndex);
    }
    /*---- Media queries ----*/
    if ( this.screenWidth >= 1300 ) {
      this.imgsToDisplay = 4;
      this.fCarouselInit();

    } else if ( this.screenWidth < 1299 && this.screenWidth >= 900 ) {
      this.imgsToDisplay = 3;
      this.fCarouselInit();

    } else if ( this.screenWidth < 899 && this.screenWidth >= 640 ) {
      this.imgsToDisplay = 2;
      this.fCarouselInit();

    } else {
      this.imgsToDisplay = 1;
      this.fCarouselInit();
    }

  }

}
