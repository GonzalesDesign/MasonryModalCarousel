
import { Component, OnInit, AfterViewInit, AfterViewChecked, Inject, ViewChild, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FunksionsService } from './../../../services/funksions.service';
import { CarouselService } from './../../../services/carousel.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})


export class PopUpComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('modalKontainerChild') modalChildKontainer: ElementRef;
  @ViewChild('carouselKontainerChild') carouselChildKontainer: ElementRef;


  /*---= PopUp params properties =---*/
  public popImagePath = this.xData.imgPath;
  public imageToLoad = this.xData.imahe;
  public titolo = this.xData.titolo;
  public popDescription = this.xData.deskription;

  /*---= Carousel properties =---*/
  public screenWidth: number = window.innerWidth;
  public modalKontainerId = document.getElementById('modal-kontainer-id');
  public modalKontainerWidth: any;
  public carouselKontainer = '#carousel-kontainer-id'; // ul: photos strip
  public carouselKontainerWidth: any;
  public imageKontainer = '.image-kontainer';
  public fotoWidth?: any;
  public fotoHeight = 70;
  public marginsx = 100;
  public imgsToDisplay: number = 2;
  public photosLength: number;
  public leftArrowButtonsKontainer = ('.left-button-kontainer');
  public rightArrowButtonsKontainer = ('.right-button-kontainer');
  public rightArrowButtonsKontainerXPos: any;

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public xData: any,
    private _funksions: FunksionsService,
    private _carousel: CarouselService ) { }

  ngOnInit() {
    this.photosLength = this.imageToLoad.length;
    console.log('photosLength: ', this.photosLength);
    this.fSliderInit();
  }

  ngAfterViewInit() {
    console.log('|-----= ngAfterViewInit() =-----|');
  //  this.fSliderInit();
  }

  ngAfterViewChecked() {
    /* this life cycle hook also resized pop up and its content */
    // console.log('|-----= ngAfterViewChecked() =-----|');
    // this.fSliderInit();
  }

  public fSliderInit() {
    console.log('this.carouselChildKontainer: ', this.carouselChildKontainer);
    console.log('this.carouselChildKontainer: ', this.carouselChildKontainer.nativeElement.nodeName);
    console.log('this.carouselChildKontainer: ', this.carouselChildKontainer.nativeElement.clientWidth);
    /* setTimeout fixes the ff Error: ExpressionChangedAfterItHasBeenCheckedError */
    const btnKontainerWidth = 200;
    const btnKontainerPadding = 28;
    setTimeout(() => {
      this.carouselKontainerWidth = this.carouselChildKontainer.nativeElement.clientWidth;
      this.fotoWidth = this.carouselKontainerWidth / this.imgsToDisplay ;
      this.rightArrowButtonsKontainerXPos = this.carouselKontainerWidth - btnKontainerWidth - btnKontainerPadding;
      // console.log('this.carouselChildKontainer: ', this.carouselChildKontainer.nativeElement);
    }, 30);

    // console.log('imgsToDisplay: ', this.imgsToDisplay);
    // console.log('modalKontainerWidth: ', this.modalKontainerWidth);
    // console.log('carouselKontainerWidth: ', this.carouselKontainerWidth);
    // console.log('fotoWidth: ', this.fotoWidth);
  }

  /*-- method call from view when pressing the right button --*/
  /* fSlideLeft() {
    this._carousel.fSlideCarousel(
            this.carouselKontainer,
            'left',
            this.fotoWidth,
            this.imgsToDisplay,
            this.carouselKontainerWidth);
  } */

  fSlideLeft() {
    this._carousel.fSlideCarousel(
    this.imageKontainer,
    this.fotoWidth,
    this.imgsToDisplay);
  }

  /**********---== RESPONSIVENESS ==---**********/

  /*---- Viewport Resize ----*/
  @HostListener('window:resize', ['$event'])
  // @HostListener(this._windowRef._window(), ['$event'])
  onResize(event) {
    this.resizeMe();
  }

  public resizeMe() {
    // console.log('resizeMe:------------------------');

    this.screenWidth = window.innerWidth;
    /*---- Media queries ----*/
    if ( this.screenWidth >= 1300 ) {
      this.imgsToDisplay = 4;
      this.fSliderInit();

    } else if ( this.screenWidth < 1299 && this.screenWidth >= 900 ) {
      this.imgsToDisplay = 3;
      this.fSliderInit();

    } else if ( this.screenWidth < 899 && this.screenWidth >= 640 ) {
      this.imgsToDisplay = 2;
      this.fSliderInit();

    } else {
      this.imgsToDisplay = 1;
      this.fSliderInit();
    }

  }

}
