import { Injectable } from '@angular/core';
import { TweenMax, TimelineMax, Power2, Power4, Elastic } from "gsap";
import { FunksionsService } from './funksions.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  public commonCounter = 0;
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

  public fSlideCarousel(elem, imgWidth, imgsToDisplay){
    this.commonCounter--; // click counter
    const displayMaskWidth = (imgWidth * imgsToDisplay); // displayMaskWidth: photo strip mask width
    this.xPos = (displayMaskWidth * this.commonCounter); // xPos: photo strip horizontal position
    TweenMax.to(elem, 1, {x: this.xPos, ease: Power2.easeInOut}); // positioning photo strip horizontally
  }
  public fSlideCarousel2(elem, slideDirection, imgWidth, imgsToDisplay, imgKontainerWidth) {
    // if right button is clicked, image kontainer slides left
    const displayMaskWidth = (imgWidth * imgsToDisplay);
    // console.log('displayMaskWidth: ', displayMaskWidth);

    if ( slideDirection === 'left' ) {
      this.commonCounter--;
      this.xPos = (displayMaskWidth * this.commonCounter);
      // this.fShowMe(this.leftArrowIcon); // left arrow is disabled inititally
      this._funksions.fElementVisibility(this.leftArrowIcon, 'visible');

      // console.log('slideDirection: ', slideDirection);
      // console.log('displayMaskWidth: ', displayMaskWidth);

      // console.log('this.commonCounter: ', this.commonCounter);
      // console.log('this.xPos: ', this.xPos);

      // if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
      //   this.xPos = -(imgKontainerWidth - displayMaskWidth);
      //   // this.fHideMe(this.rightArrowIcon);
      //   this._funksions.fElementVisibility(this.rightArrowIcon, 'hidden');
      // }
    // else if left button is clicked, image kontainer slides right
    } else if ( slideDirection === 'right' ) {
      this.commonCounter++;
      this.xPos = (displayMaskWidth * this.commonCounter);
      this._funksions.fElementVisibility(this.rightArrowIcon, 'visible');
      // console.log('slideDirection: ', slideDirection);
      // console.log('this.commonCounter: ', this.commonCounter);
      // console.log('this.xPos: ', this.xPos);

      // if (this.xPos >= 0) {
      //   this.xPos = 0;
      //   this.commonCounter = 0;
      //   this._funksions.fElementVisibility(this.leftArrowIcon, 'hidden');
      // }
    } else if ( slideDirection === 'none' ) {
      this.commonCounter = this.commonCounter;
      this.xPos = (displayMaskWidth * this.commonCounter);
      // console.log('this.commonCounter: ', this.commonCounter);
    }
    /*--- When to hide the left and right arrows ---*/
    if (this.xPos >= 0) {
      this.xPos = 0;
      this.commonCounter = 0;
      this._funksions.fElementVisibility(this.leftArrowIcon, 'hidden');
    } else if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
    // } else if ((this.xPos <= -(imgKontainerWidth - displayMaskWidth)) && (this.endOfStrip === true )) {
      // console.log('hiding right arrow');
      this.xPos = -(imgKontainerWidth - displayMaskWidth);
      // this.fHideMe(this.rightArrowIcon);
      this._funksions.fElementVisibility(this.rightArrowIcon, 'hidden');
    }
    /*--- Resetting last commonCounter index based on photo strip width ---*/
    if (this.xPos <= -(imgKontainerWidth - displayMaskWidth)) {
      this.endOfStrip = true;
      this._funksions.fElementVisibility(this.rightArrowIcon, 'hidden');
    } else {
      this.endOfStrip = false;
      // show right button when photo strip isn't at the end. happens when resizing screen.
      this._funksions.fElementVisibility(this.rightArrowIcon, 'visible');
    }

    /*--- animation using GSAP ---*/
    // const fCarouselSlide(elem) {
      TweenMax.to(elem, 1, {x: this.xPos, ease: Power2.easeInOut});
      // console.log('elem: ', elem);
      // console.log('x: ', this.x);
      // console.log('this.xPos: ', this.xPos);
    // };
  }
}
