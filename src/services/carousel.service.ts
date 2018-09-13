import { Injectable } from '@angular/core';
import { TweenMax, TimelineMax, Power2, Power4, Elastic } from "gsap";
import { FunksionsService } from './funksions.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  public commonCounter: number;
  public xPos = 0;
  public endOfStrip: boolean;
  // public imgCount = 19; // photos.length from json
  // public imgsToDisplay: number; // = 3;
  // public imgKontainerWidth; // = (this.imgWidth * this.imgCount);

  // public screenWidth: number = window.innerWidth;

  public leftArrowIcon = '.rlg-left-arrow';
  public rightArrowIcon = '.rlg-right-arrow';

  // public foto = '.image';
  // public imgWidth: number; // = 350; // (screen width - margin)/imgsToDisplay
  // public imgsFrame = '.main-kontainer';
  // public displayMaskWidth: number; // = (this.imgWidth * this.imgsToDisplay);
  // public elem = ('#rlg-image-kontainer');
  // public array_of_li =  document.getElementsByTagName('li');
  // public array_of_li =  document.querySelectorAll('ul.rlg-image-kontainer li');

  constructor(private _funksions: FunksionsService) {}

  /** Description: *******************************************************
   ** Service for sliding Carousel. Animation engine using AnimeJS
   ***********************************************************************/
  /**-----------=====| slideCarousel Reference Variables |=====-----------**/
  /* fSliderImagesInit(img, margins, imgsToDisplay, imgCount) {
    console.log('img: ', img);
    this.imgWidth = (this.screenWidth - (margins * 2)) / imgsToDisplay;
    console.log('imageWidth: ', this.imgWidth);
    this.imgKontainerWidth = (this.imgWidth * imgCount);
    console.log('this.imgKontainerWidth: ', this.imgKontainerWidth);
    this.displayMaskWidth = (this.imgWidth * imgsToDisplay);
    console.log('this.displayMaskWidth: ', this.displayMaskWidth);
    // this.fImageWidth(this.foto, this.imgWidth);
    // this.fImageWidth(img, this.imgWidth);
    // console.log('this.foto: ', this.foto);
    // this.fImageWidth(this.imgsFrame, this.displayMaskWidth);
    // this.fImageWidth(img, this.displayMaskWidth);
  } */

  /* public fSlideCarousel2(elem, imgWidth, imgsToDisplay) {
    this.commonCounter--; // click counter
    const displayMaskWidth = (imgWidth * imgsToDisplay); // displayMaskWidth: photo strip mask width
    this.xPos = (displayMaskWidth * this.commonCounter); // xPos: photo strip horizontal position
    TweenMax.to(elem, 1, {x: this.xPos, ease: Power2.easeInOut}); // positioning photo strip horizontally
  }
 */

  public fSlideCarousel(elem, slideDirection, imgWidth, imgsToDisplay, imgKontainerWidth) {
    // this.commonCounter = 0;
    const displayMaskWidth = (imgWidth * imgsToDisplay); // carousel mask width

    /*--= if right button is clicked, image kontainer slides left =--*/
    if ( slideDirection === 'left' ) {
      this.commonCounter--;
      this.xPos = (displayMaskWidth * this.commonCounter);
      // this.fShowMe(this.leftArrowIcon); // left arrow is disabled inititally
      this._funksions.fElementVisibility(this.leftArrowIcon, 'visible'); // show hidden left arrow

      /* if (this.commonCounter === NaN) { // test
        this.commonCounter = 0;
        console.log('NaN: commonCounter: ', this.commonCounter);
      } */

      console.log('slide=left: commonCounter: ', this.commonCounter);
      console.log('slideDirection: ', slideDirection);


    /*--= else if left button is clicked, image kontainer slides right =--*/
    } else if ( slideDirection === 'right' ) {
      this.commonCounter++;
      this.xPos = (displayMaskWidth * this.commonCounter);
      this._funksions.fElementVisibility(this.rightArrowIcon, 'visible'); // show hidden right arrow

      /* if (this.commonCounter === NaN) { // test
        this.commonCounter = 0;
        console.log('NaN: commonCounter: ', this.commonCounter);
      } */

      console.log('slide=right: commonCounter: ', this.commonCounter);

    } else if ( slideDirection === 'none' ) { // called inside fCarouselInit()
      const counter = this.commonCounter;
      this.xPos = (displayMaskWidth * counter);
      // this.commonCounter = this.commonCounter;
      // this.xPos = (displayMaskWidth * this.commonCounter);

      /* if (this.commonCounter === NaN) { // test
        this.commonCounter = 0;
        console.log('NaN: commonCounter: ', this.commonCounter);
      } */

      console.log('slide=none: counter: ', counter);
      console.log('isNaN(counter): ', isNaN(counter));
      console.log('xPos: ', this.xPos);
      // console.log('displayMaskWidth: ', displayMaskWidth);

      /*•••= Don't know why, sometimes, it makes "counter" value
      to NaN when you pop a modal and click on the right arrow,
      image strip slides left || resize the screen then closed
      the pop up and open another pop up, counter becomes NaN.
      Code below forced the counter to reset to zero when isNaN:true =•••*/
      if (isNaN(counter)) {
        this.commonCounter = 0; 
        console.log('NaN: commonCounter: ', this.commonCounter);
      }
    }


    /*--- When to hide the left and right arrows ---*/
    if (this.xPos >= 0) {
      this.xPos = 0;
      this.commonCounter = 0;
      this.endOfStrip = false;
      console.log('xPos >= 0: ', this.xPos);
      this._funksions.fElementVisibility(this.leftArrowIcon, 'hidden');

    } else if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
    // } else if ((this.xPos <= -(imgKontainerWidth - displayMaskWidth)) && (this.endOfStrip === true )) {
      // console.log('hiding right arrow');
      this.xPos = -(imgKontainerWidth - displayMaskWidth);
      // console.log('Hide right arrow: ', this.xPos);
      // this.fHideMe(this.rightArrowIcon);
      this._funksions.fElementVisibility(this.rightArrowIcon, 'hidden');
    // }
    /*--- Resetting last commonCounter index based on photo strip width ---*/
    // if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) { //dupe
      this.endOfStrip = true;
      // console.log('Rest commonCounter xPos: ', this.xPos);
      // this._funksions.fElementVisibility(this.rightArrowIcon, 'hidden'); //duplicated
      console.log('xPos <= 0: ', this.xPos);
    } else {
      this.endOfStrip = false;
      // show right button when photo strip isn't at the end. happens when resizing screen.
      this._funksions.fElementVisibility(this.rightArrowIcon, 'visible');
    }

    /*--- animation using GSAP ---*/
      TweenMax.to(elem, 1, { x: this.xPos, ease: Power2.easeInOut});


      // console.log('endOfStrip: ', this.endOfStrip);
      console.log('commonCounter: ', this.commonCounter);
      // console.log('imgKontainerWidth: ', imgKontainerWidth);

  }
}
